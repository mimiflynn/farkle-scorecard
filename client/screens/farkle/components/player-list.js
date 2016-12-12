import React, { PropTypes } from 'react';

const Players = ({
  players
}) => {
  const PlayerList = Object.keys(players).map((player, index) => (
    <li key={'player-' + index} className="player-list-item">
      {player}
    </li>
  ));
  console.log('players', players);

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
  players: PropTypes.object
};

export default Players;

