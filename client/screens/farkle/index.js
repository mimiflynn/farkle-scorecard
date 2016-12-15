import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Wrapper from '../components/wrapper';
import PlayerForm from './components/player-form';
import PlayerOrderList from './components/player-order-list';

import { fetchPlayers, savePlayer } from '../../actions/player';
import { isEmpty } from '../../utils/utils';

const Loading = () => (
  <div className="farkle-loading">
    <h1 className="farkle-loading-title">Add Players</h1>
  </div>
);

class Farkle extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      turnOrder: []
    };

    this.savePlayer = this.savePlayer.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.renderStartGame = this.renderStartGame.bind(this);
  }

  savePlayer (player) {
    const players = this.props.players.slice(0);
    players.push(player);
    this.props.dispatch(savePlayer(players));
  }

  onSortEnd (players) {
    this.props.dispatch(savePlayer(players));
  }

  renderStartGame () {
    return (
      <div className="container">
        {(this.props.players.length >= 2) ? <Link to="game" className="btn btn-primary">Start Game</Link> : 'Please add more players'}
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
        <div className="container">
          {(!this.state.loading) ? <PlayerOrderList onSortEnd={this.onSortEnd} players={this.props.players} /> : <Loading />}
        </div>
        <div className="container">
          <PlayerForm submitForm={this.savePlayer} />
        </div>
        {(!this.state.loading) ? this.renderStartGame() : null}
      </Wrapper>
    );
  }
}

Farkle.propTypes = {
  players: PropTypes.array,
  dispatch: PropTypes.func,
  route: PropTypes.object
};

function mapStateToProps (state) {
  return state.player;
}

export default connect(mapStateToProps)(Farkle);

