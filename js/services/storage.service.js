export const Storage = {
    save,
    load
}

function save(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
}

function load(key) {
    var json = localStorage.getItem(key);
    var val = JSON.parse(json);
    return val;
}
