import React, { PropTypes } from 'react';

const PlayerCurrent = ({
  children,
  currentPlayer
}) => {
  const playerIcon = (currentPlayer.icon) ? 'icon-user' : 'icon-wink';
  return (
    <div className="container">
      <h1>Current Player:</h1>
      <h2>
        <span className={playerIcon}>&nbsp;</span>
        {currentPlayer.name}
      </h2>
      <div>Current Score: {currentPlayer.score}</div>
      {children}
    </div>
  );
};

PlayerCurrent.propTypes = {
  children: PropTypes.node,
  currentPlayer: PropTypes.object,
  players: PropTypes.array
};

export default PlayerCurrent;
