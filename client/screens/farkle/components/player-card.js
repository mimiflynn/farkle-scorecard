import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd');
import { connect } from 'react-redux';

import Mute from './mute';

const PlayerCard = ({
  user
}) => (
  <div className="player-wrapper">
    <div className="player-card">
      <div className="player-card__title">{user.name}</div>
    </div>
    <Mute on={user.options.muted} className="player-card__icon player-card__mic" />
  </div>
);

PlayerCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

export default connect(null)(PlayerCard);

