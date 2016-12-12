const constants = require('../constants');
const { api } = require('../config.js');

const url = api.baseUrl + api.users;

function receivePlayers (json) {
  return {
    type: constants.RECEIVE_PLAYERS,
    json,
    receivedAt: Date.now()
  };
}

function fetchPlayers () {
  return dispatch => {
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receivePlayers(json)));
  };
}

module.exports = { fetchPlayers, receivePlayers };

