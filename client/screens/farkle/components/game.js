import React from 'react';
import classNames from 'classnames';

import PlayerCard from './player-card';

const Players = ({
  users
}) => {
  const cards = users.map((user, index) => (
    <PlayerCard user={ user } key={ 'user-' + index } />
  ));

  return (
    <div className="players">
      { cards }
    </div>
  );
};

Players.propTypes = {
  className: React.PropTypes.string,
  users: React.PropTypes.array
};

export default Players;

