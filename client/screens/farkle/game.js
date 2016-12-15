import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Wrapper from '../components/wrapper';
import Index from './index';
import PlayerCard from './components/player-card';

import { fetchPlayers, savePlayer } from '../../actions/player';
import { isEmpty } from '../../utils/utils';

class Game extends Index {
  handleSubmitForm (player) {
    const players = this.props.players.slice(0);
    players.push(player);
    this.props.dispatch(savePlayer(players));
  }

  renderPlayers () {
    const players = this.props.players.map((player, index) => {
      return <PlayerCard key={'player-' + index} player={player} />;
    });
    return (
      <div className="container">
        {players}
      </div>
    );
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      loading: isEmpty(nextProps.players)
    });
  }

  componentDidMount () {
    this.props.dispatch(fetchPlayers());
  }

  render () {
    return (
      <Wrapper>
        {(this.props.players) ? this.renderPlayers() : <Link to="/">Add players</Link>}
      </Wrapper>
    );
  }
}

Game.propTypes = {
  players: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps (state) {
  console.log('state', state);
  return state.player;
}

export default connect(mapStateToProps)(Game);
