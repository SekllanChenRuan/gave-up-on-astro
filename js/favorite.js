let directionsService;
let directionsRenderer;
let map;
let geocoder;
// Initialize and add the map
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  const coordinates = {
    lat: 47.30111,
    lng: -122.22413,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: coordinates,
  });

  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
  });

  const circle = new google.maps.Circle({
    //adds a circle
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: coordinates,
    radius: 100,
  });

  //event listener to show the lat and longitude on map click for user using InfoWindow API
  map.addListener("click", (e) => {
    alert(
      "You clicked the map at " + JSON.stringify(e.latLng.toJSON(), null, 2)
    );
  });
  directionsRenderer.setMap(map);
}

function calcRoute() {
  let start = document.getElementById("origin").value;
  let end = document.getElementById("destination").value;
  let request = {
    origin: start,
    destination: end,
    travelMode: "DRIVING",
  };
  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("An unexpected error occurred");
    }
  });
}

function getCoordinates() {
  let address = document.getElementById("address").value;
  geocoder.geocode(
    {
      address: address,
    },
    function (results, status) {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }
  );
}

function createCircle() {
  let lat = parseFloat(document.getElementById("latitude").value);
  let long = parseFloat(document.getElementById("longitude").value);
  let radius = parseFloat(document.getElementById("radius").value);
  let coordinates = {
    lat: lat,
    lng: long,
  };
  const circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: coordinates,
    radius: radius,
  });
}
