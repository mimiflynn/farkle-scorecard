import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const PlayerCard = ({
  player
}) => (
  <div className="player-wrapper">
    <div className="player-card">
      <h2 className="player-card__title">{player.name}</h2>
    </div>
  </div>
);

PlayerCard.propTypes = {
  className: PropTypes.string,
  player: PropTypes.object
};

export default connect(null)(PlayerCard);

