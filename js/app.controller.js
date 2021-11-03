import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemoveLoc = onRemoveLoc;
window.onMoveToLoc = onMoveToLoc;

function onInit() {
  mapService
    .initMap(renderTableLocs)
    .then((res) => renderTableLocs(res))
    .catch(() => console.log("Error: cannot init map"));
}

function renderTableLocs(locs) {
    console.log(locs);
  var strHtmls = locs.map((loc) => {
    return `<tr>
        <td>${loc.name}</td>
        <td><button onclick="onPanTo(${loc.lat},${loc.lng})">Go There</button></td>
        <td><button onclick="onRemoveLoc('${loc.id}')">X</button></td>
    </tr>`;
  });
  var elTbody = document.querySelector(".table-body");
  elTbody.innerHTML = strHtmls.join("");
}

function onRemoveLoc(id){
   
    locService.removeLoc(id,renderTableLocs)
    
}



// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
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
    
      onPanTo(pos.coords.latitude, pos.coords.longitude)
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
function onPanTo(lat, lng) {
    console.log(lat,lng);
  console.log("Panning the Map");
  
  mapService.panTo(lat, lng);
}

function onMoveToLoc(){
   var locName = document.querySelector(`[name=user-loc]`).value
   
}
