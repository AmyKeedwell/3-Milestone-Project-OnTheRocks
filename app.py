import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
# Route decorator to navigate to the home page
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/get_recipes")
# Retrieve recipe information from the recipies dataabse in MongoDB
def get_recipes():
    recipies = list(mongo.db.recipies.find())
    return render_template("recipes.html", recipies=recipies)


@app.route("/search", methods=["GET", "POST"])
# allow users find recipes via text search
def search():
    query = request.form.get("query")
    recipies = list(mongo.db.recipies.find({"$text": {"$search": query}}))
    return render_template("recipes.html", recipies=recipies)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if user already registered
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(register)

        # put new user into session
        session["user"] = request.form.get("username").lower()
        flash("Registration Successful!")
        return redirect(url_for(
            "profile", username=session["user"]))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if user already registered
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))
                return redirect(url_for(
                    "profile", username=session["user"]))
            else:
                # invalid password
                flash("Incorrect username and/or password")
                return redirect(url_for("login"))

        else:
            # username doesn't exist
            flash("Incorrect username and/or password")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # get session users username from the mongo db
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]

    if session["user"]:
        # display all recipies added by that user
        user = mongo.db.users.find_one({"username": session['user']})
        recipies = mongo.db.recipies.find({"created_by": session['user']})
        recipies = list(recipies)
        return render_template(
                "profile.html",
                username=username,
                recipies=recipies)
    else:
        return redirect(url_for("login"))


@app.route("/logout")
def logout():
    # remove user from session cookies
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


@app.route("/add_cocktail", methods=["GET", "POST"])
def add_cocktail():
    # takes user input to send to DB
    if request.method == "POST":
        recipies = {
            "url": request.form.get("url"),
            "cocktail_name": request.form.get("cocktail_name"),
            "ingredients": request.form.get("ingredients"),
            "method": request.form.get("method"),
            "created_by": session["user"]
        }
        # post users input to MongoDB
        mongo.db.recipies.insert_one(recipies)
        flash("New Cocktail Successfully Added!")
        return redirect(url_for("get_recipes"))

    return render_template("add_cocktail.html")


@app.route("/edit_recipies/<recipies_id>", methods=["GET", "POST"])
def edit_recipe(recipies_id):
    if request.method == "POST":
        submit = {
            "url": request.form.get("url"),
            "cocktail_name": request.form.get("cocktail_name"),
            "ingredients": request.form.get("ingredients"),
            "method": request.form.get("method"),
            "created_by": session["user"]
        }

        mongo.db.recipies.update({"_id": ObjectId(recipies_id)}, submit)
        flash("Cocktail Successfully Edited!")
        return redirect(url_for("get_recipes"))

    recipies = mongo.db.recipies.find_one({"_id": ObjectId(recipies_id)})
    return render_template("edit_cocktail.html", recipies=recipies)


@app.route("/delete_cocktail/<recipies_id>")
def delete_cocktail(recipies_id):
    # delete input verified by MongoDB id
    mongo.db.recipies.remove({"_id": ObjectId(recipies_id)})
    flash("Cocktail Successfully Deleted!")
    return redirect(url_for("get_recipes"))


@app.route("/location")
def location():
    # to navigate to location page from navbar
    return render_template("location.html")


@app.errorhandler(404)
def page_not_found(e):
    # custom 404 error page
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    # custom 500 error page
    return render_template('500.html'), 500


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=False)
