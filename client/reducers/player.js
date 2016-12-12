import constants from '../constants';

const initialState = {};

function update (state = initialState, action) {
  switch (action.type) {
    case constants.RECEIVE_PLAYERS:
      return Object.assign({}, state, action.json);

    default:
      return state;
  }
}

export default update;

