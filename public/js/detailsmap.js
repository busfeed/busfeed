function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: dLat, lng: dLong},
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false
   });

   var stop_mark = new google.maps.Marker({
      position: {lat: dLat, lng: dLong},
      map:map
   });

   var stop_info = new google.maps.InfoWindow({
      content: stopName
   });

   stop_mark.addListener('click', function() {
      stop_info.open(map, stop_mark);
   });

   stop_info.open(map, stop_mark);

   // Try HTML5 geolocation.
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
         };

         var loc_mark = new google.maps.Marker({
            position: pos,
            map: map
         });

         var loc_info = new google.maps.InfoWindow({
            content: "Your Location"
         });

         loc_mark.addListener('click', function() {
            loc_info.open(map, loc_mark);
         });


         loc_info.open(map, loc_mark);
         bounds = new google.maps.LatLngBounds();
         bounds.extend(map.center);
         bounds.extend(pos);
         map.setCenter(bounds.getCenter());

         google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
            this.setZoom(map.getZoom());

            if (this.getZoom() > 15) {
               this.setZoom(15);
            }
         });

         map.fitBounds(bounds);
      }, function() {
         console.log("Geolocation service failed");
      });
   } else {
      console.log("Geolocation not enabled");
   }
}
