import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Wrapper from '../components/wrapper';
// import PlayerCard from './components/player-card';

import { fetchPlayers, savePlayer } from '../../actions/player';
import { isEmpty } from '../../utils/utils';

class Game extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentPlayer: 0
    };

    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  handlePlayerClick (e) {
    console.log('player click', e);
    this.setState({
      currentPlayer: this.state.currentPlayer + 1
    });
  }

  handleSubmitForm (player) {
    const players = this.props.players.slice(0);
    players.push(player);
    this.props.dispatch(savePlayer(players));
  }

  renderPlayers () {
    const players = this.props.players.map((player, index) => {
      const classnames = classNames('list-group-item', (this.state.currentPlayer === index) ? 'active' : 'disabled');
      return (
        <li className={classnames} key={'player-' + index}>
          <span className="tag tag-default tag-pill float-xs-right">{player.score}</span>
          {player.name}
        </li>
      );
    });
    return (
      <ul className="list-group">
        {players}
      </ul>
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
