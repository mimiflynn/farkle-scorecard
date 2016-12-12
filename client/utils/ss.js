// sessionStorage tools

const getJSON = (key, cb) => {
  const value = sessionStorage.getItem(key);
  if (value === 'undefined') {
    cb('undefined', null);
  } else {
    cb(null, JSON.parse(value));
  }
};

const saveJSON = (key, obj, cb) => {
  sessionStorage.setItem(key, JSON.stringify(obj));
  if (cb) {
    cb();
  }
};

export default {
  getJSON,
  saveJSON
};
