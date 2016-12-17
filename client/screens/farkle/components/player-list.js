import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PlayerList = ({
  currentPlayer,
  players
}) => {
  const playerList = players.map((player, index) => {
    const classnames = classNames('list-group-item', (currentPlayer === index) ? 'active' : 'disabled');
    const playerIcon = (player.icon) ? 'icon-user' : 'icon-wink';
    const onBoardIcon = (player.onBoard) ? null : 'icon-notification';
    return (
      <li className={classnames} key={'player-' + index}>
        <span className={onBoardIcon}>&nbsp;</span>
        <span className={playerIcon}>&nbsp;</span>
        <span className="tag tag-default tag-pill float-xs-right">{player.score}</span>
        {player.name}
      </li>
    );
  });

  return (
    <div className="container">
      <ul className="list-group">
        {playerList}
      </ul>
    </div>
  );
};

PlayerList.propTypes = {
  currentPlayer: PropTypes.number,
  players: PropTypes.array
};

export default PlayerList;
