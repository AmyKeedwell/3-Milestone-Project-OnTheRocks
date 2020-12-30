 $(document).ready(function(){
     $('.sidenav').sidenav({edge: "right"});
  });


 $(document).ready(function(){
    $('.collapsible').collapsible();
  });


 $(document).ready(function(){
    $('select').formSelect();
  });


  $(document).ready(function(){
    $('.datepicker').datepicker();
  });


  $(document).ready(function(){
    $('.modal').modal();
  });


   $(document).ready(function(){
    $('.tooltipped').tooltip();
  });


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

/* commented out emailJS code as makes map disappear - not sure why!? */
/*function() {
    emailjs.init('user_P9gB7l2oLHOlGUV26YW2y');
}();

window.onload = function() {
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
*/