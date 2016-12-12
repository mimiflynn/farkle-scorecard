// sessionStorage tools

// returns session storage value per key
const getJSON = (key) => {
  return new Promise((resolve, reject) => {
    const value = sessionStorage.getItem(key);
    if (value !== 'undefined') {
      resolve(JSON.parse(value));
    } else {
      console.log('getJSON reject');
      reject({ message: 'empty' });
    }
  });
};

// saves session storage value to key and returns new key value
const saveJSON = (key, obj) => {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem(key, JSON.stringify(obj));
    const value = sessionStorage.getItem(key);
    if (value !== 'undefined') {
      resolve(JSON.parse(value));
    } else {
      reject({ message: 'empty' });
    }
  });
};

module.exports = {
  getJSON,
  saveJSON
};
