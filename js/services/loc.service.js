export const locService = {
  getLocs,
};

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
