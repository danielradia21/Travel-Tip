import { Storage } from "./storage.service.js";

export const mapService = {
  initMap,
  addMarker,
  panTo,
};

var gMap;

function initMap(cb, lat = 32.0749831, lng = 34.9120554) {
  return _connectGoogleApi().then(() => {
    var placeName;
    console.log("google available");
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });
    google.maps.event.addListener(gMap, "click", (event) => {
      placeName = prompt("tag the place");
      lat = event.latLng.lat().toFixed(5);
      lng = event.latLng.lng().toFixed(5);
      addMarker(event.latLng, placeName);

      console.log(placeName);
      var locs = Storage.load("locsDB");
      if (!locs || !locs.length) {
        locs = [];
      }
      locs.push({ id: "101", name: placeName, lat, lng, weather: "summer" });
      Storage.save("locsDB", locs);
      cb(locs);
    });
    return Promise.resolve(Storage.load("locsDB"));
  });
}

function addMarker(loc, title) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title,
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}
function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = "AIzaSyB97fyJMtfrd0AD4UjNAuD0Qul-VOXE8G4";
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
