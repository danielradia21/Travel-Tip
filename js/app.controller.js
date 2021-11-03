import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemoveLoc = onRemoveLoc;
window.onMoveToLoc = onMoveToLoc;
window.onCopyLoc = onCopyLoc;

function onInit() {
  mapService
    .initMap(renderTableLocs)
    .then((res) => renderTableLocs(res))
    .catch(() => console.log("Error: cannot init map"));
}

function renderTableLocs(locs) {
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

function onRemoveLoc(id) {
  locService.removeLoc(id, renderTableLocs);
}



// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    document.querySelector(".locs").innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
   
  getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {});
}

function onMoveToLoc() {
  var locName = document.querySelector("[name=user-loc]").value;
  mapService.moveToLoc(locName).then((res) => {
    document.querySelector(".Input-loc").innerText = res[res.length - 1].name;
    renderTableLocs(res)
  })
}

function onPanTo(lat, lng) {
  mapService.panTo(lat, lng);
}

function onCopyLoc(){
   mapService.copyLoc();
}

