import constants from '../constants';
import { getJSON, saveJSON } from '../utils/ss';

const key = 'players';

function receivePlayers (json) {
  return {
    type: constants.RECEIVE_PLAYERS,
    json,
    receivedAt: Date.now()
  };
}

function fetchPlayers () {
  return dispatch => {
    return getJSON(key)
      .then(
        (json) => dispatch(receivePlayers(json)),
        (error) => dispatch(receivePlayers(error))
      );
  };
}

function savePlayer (players) {
  return dispatch => {
    return saveJSON(key, players)
      .then(
        (json) => dispatch(receivePlayers(json)),
        (error) => dispatch(receivePlayers(error))
      );
  };
}

module.exports = { fetchPlayers, receivePlayers, savePlayer };

