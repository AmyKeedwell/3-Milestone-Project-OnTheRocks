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
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}