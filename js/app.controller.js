import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  mapService
    .initMap(renderTableLocs)
    .then((res) => renderTableLocs(res))
    .catch(() => console.log("Error: cannot init map"));
}

function renderTableLocs(places) {
  console.log(places);

  var strHtmls = places.map((place) => {
    return `<tr>
        <td>${place.name}</td>
        <td><button onclick="onPanTo(${
          (place.lat, place.lng)
        })">Go There</button></td>
        <td><button onclick="removePlace(this)">X</button></td>
    </tr>`;
  });
  var elTbody = document.querySelector(".table-body");
  elTbody.innerHTML = strHtmls.join("");
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs);
    document.querySelector(".locs").innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords);
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
function onPanTo(lat, lng) {
  console.log("Panning the Map");
  1;
  mapService.panTo(lat, lng);
}
