function isEmpty (data) {
  if (data === undefined || !Object.keys(data).length) {
    return true;
  }
  return false;
}

function isDuplicate (item, key, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === item) {
      return true;
    }
  }
  return false;
}

function formatPhone (phonenum) {
  const regex = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
  let phone = '';

  if (regex.test(phonenum)) {
    const parts = phonenum.match(regex);

    if (parts[1]) {
      phone += '+1 (' + parts[1] + ') ';
    }

    phone += parts[2] + '-' + parts[3];
  } else {
    // invalid phone number
    phone = phonenum;
  }
  return phone;
}

function orderByDate (arr, dateKey) {
  return arr.slice().sort((a, b) => {
    return a[dateKey] < b[dateKey] ? -1 : 1;
  });
}

module.exports = { isEmpty, isDuplicate, formatPhone, orderByDate };

