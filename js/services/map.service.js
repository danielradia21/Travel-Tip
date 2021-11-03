import { Storage } from "./storage.service.js";
import { utils } from "./utils.service.js";

const KEY = "locsDB";

export const mapService = {
  initMap,
  addMarker,
  panTo,
  moveToLoc,
  copyLoc
};

var gMap;

function initMap(cb, lat = 52.377956, lng = 4.897070) {
  return _connectGoogleApi().then(() => {
    var placeName;
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 12,
    });
    google.maps.event.addListener(gMap, "click", (event) => {
      placeName = prompt("tag the place");
      lat = event.latLng.lat().toFixed(5);
      lng = event.latLng.lng().toFixed(5);
      addMarker(event.latLng, placeName);

      var locs = Storage.load(KEY);
      if (!locs || !locs.length) {
        locs = [];
      }
      locs.push({
        id: utils.randomId(),
        name: placeName,
        lat,
        lng,
        weather: "summer",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      Storage.save(KEY, locs);
      cb(locs);
    });
    return Promise.resolve(Storage.load(KEY));
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
  addMarker(laLatLng, "My-Home");
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

function moveToLoc(locName) {
  var address, latLng;
  locName.split(" ").join("+");
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=AIzaSyBLuunqbpZAednEd7etEVETfGCaUCRMJCI`
    )
    .then((res) => {
      address = res.data.results[0].formatted_address;
      latLng = res.data.results[0].geometry.location;
      addMarker(latLng, address);
      var { lat, lng } = latLng;
      panTo(lat, lng);

      var locs = Storage.load(KEY);
      if (!locs || !locs.length) {
        locs = [];
      }
      locs.push({
        id: utils.randomId(),
        name: address,
        lat,
        lng,
        weather: "summer",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      Storage.save(KEY, locs);
      return locs;
    });
}

function copyLoc(){
    var locs = Storage.load(KEY)
    if(!locs || !locs.length) return 
    var loc = locs[locs.length-1]
    // window.location.href = `https://danielradia21.github.io/Travel-Tip/?lat=${loc.lat}&lng=${loc.lng}`

}

