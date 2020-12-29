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

