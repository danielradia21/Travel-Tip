export const locService = {
  getLocs,
  removeLoc,
};

const KEY  ='locsDB'

const locs = [
  {
    id:'101',
    name: "Greatplace",
    lat: 32.047104,
    lng: 34.832384,
    weather: "TODO",
    createdAt: Date.now(),
    updatedAt: "TODO",
  },
];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function removeLoc(id) {
    var locs = Storage.load(KEY)
    var removeIdx = locs.findIndex((loc) => {
        return loc.id === id;
    });
    locs.splice(removeIdx, 1);
    Storage.save(KEY,locs);
    
}