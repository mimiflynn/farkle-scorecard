import React, { PropTypes } from 'react';

import { orderByDate } from '../../../utils/utils';

const Players = ({
  players
}) => {
  const sortedPlayers = orderByDate(players, 'joined');

  const PlayerList = sortedPlayers.map((user, index) => (
    <li key={'player-' + index} className="player-list-item">
      {user.name}
    </li>
  ));

  return (
    <div>
      <h3>Players</h3>
      <ul className="player-list">
        {PlayerList}
      </ul>
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array
};

export default Players;

