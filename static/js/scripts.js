 /* sidenav functionality */
 
 $(document).ready(function(){
     $('.sidenav').sidenav({edge: "right"});
  });

/* modal pop up when delte button is pressed */

  $(document).ready(function(){
    $('.modal').modal();
  });

  /* tool tip to add info on how to use image URL in add cocktail form */

   $(document).ready(function(){
    $('.tooltipped').tooltip();
  });

/* google maps API */

function initMap() {
        const bristol = { lat: 51.45347, lng: -2.58818 };
        var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: bristol,
        gestureHandling: "cooperative",
    });
    const marker = new google.maps.Marker({
        position: bristol,
        map: map, 
  });
}

/* button to scroll to the top of the page after scrolling down a certain amount */

mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}



/* emailJS - not working yet!*/

/*window.onload = function() {
            document.getElementById('contact-form').addEventListener('submit', function(event) {
                event.preventDefault();
                this.contact_number.value = Math.random() * 100000 | 0;
                emailjs.sendForm('contact_service', 'contact_form', this)
                    .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            });
        }

emailjs.send('gmail', 'onTheRocks', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });*/