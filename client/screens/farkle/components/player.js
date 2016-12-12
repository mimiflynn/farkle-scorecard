import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import PlayerCard from './player-card';

import { orderByDate } from '../../../utils/utils';

const Players = ({
  players,
  drawerOpen
}) => {
  const sortedPlayers = orderByDate(players, 'joined');

  const cards = sortedPlayers.map((user, index) => (
    <PlayerCard user={user} key={'user-' + index} />
  ));

  const classes = classNames('players', drawerOpen ? 'players--open' : 'players--closed');

  return (
    <div className={classes}>
      {cards}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array,
  drawerOpen: PropTypes.bool
};

export default connect(null)(Players);

