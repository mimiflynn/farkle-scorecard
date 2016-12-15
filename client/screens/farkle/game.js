import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Wrapper from '../components/wrapper';

import { fetchPlayers, savePlayer } from '../../actions/player';
import { isEmpty } from '../../utils/utils';

const getNextPlayer = (players) => {
  for (let i = 0; i < players.length - 1; i++) {
    if (players[i].turnCount > players[i + 1].turnCount) {
      return i + 1;
    }
  }
  return 0;
};

class Game extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentPlayer: 0,
      errors: [],
      value: {
        score: 0
      }
    };

    this.renderCurrentPlayer = this.renderCurrentPlayer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange (event) {
    // convert target data into a key value pair
    const name = event.target.name;
    const value = event.target.value;
    const keyValue = {};
    keyValue[name] = value;

    this.setState({
      value: Object.assign({}, this.state.value, keyValue)
    });
  }

  handleSubmitForm (event) {
    const errors = {};

    event.preventDefault();
    if (!this.state.value.score) {
      errors.score = 'Please enter a score';
    }
    if (typeof Number.parseInt(this.state.value.score, 10) !== 'number') {
      errors.score = 'Please enter a number';
    }

    if (isEmpty(errors)) {
      // no errors so save data
      this.updatePlayerScore(Number.parseInt(this.state.value.score, 10));
      this.setState({
        value: 0
      });
      // clear text field for next player
      document.getElementById('score').value = '';
    } else {
      // show errors
      console.log('ERRORS');
      this.setState({ errors });
    }
  }

  renderError (id) {
    return (
      <div className="alert alert-danger" role="alert">
        {this.state.errors[id]}
      </div>
    );
  }

  updatePlayerScore (score) {
    const players = this.props.players.slice(0);
    const newScore = players[this.state.currentPlayer].score + score;
    const newTurnCount = players[this.state.currentPlayer].turnCount + 1;
    players[this.state.currentPlayer].score = newScore;
    players[this.state.currentPlayer].turnCount = newTurnCount;
    this.props.dispatch(savePlayer(players));
  }

  renderCurrentPlayer () {
    const currentPlayer = this.props.players[this.state.currentPlayer];
    return (
      <div className="container">
        <h2>{currentPlayer.name}</h2>
        <div>Score: {currentPlayer.score}</div>
        <form id="player-form" name="player-form" onChange={this.handleChange} onSubmit={this.handleSubmitForm}>
          <div className="form-group row">
            <label htmlFor="score" className="col-xs-2 col-form-label">Turn Score</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" name="score" id="score" aria-describedby="score" placeholder="" />
            </div>
          </div>
          {(!isEmpty(this.state.errors)) ? this.renderError('score') : null}
          <button type="submit" className="btn primary-btn">Submit
            <span className="button-addon icon-Arrow-Chevron-Right" />
          </button>
        </form>
      </div>
    );
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
      <div className="container">
        <ul className="list-group">
          {players}
        </ul>
      </div>
    );
  }

  componentWillReceiveProps (nextProps) {
    console.log('next props', nextProps);
    this.setState({
      currentPlayer: getNextPlayer(nextProps.players),
      loading: isEmpty(nextProps.players)
    });
    console.log('next props state', this.state);
  }

  componentDidMount () {
    this.props.dispatch(fetchPlayers());
  }

  render () {
    console.log('current player', this.state.currentPlayer);
    return (
      <Wrapper>
        {(this.props.players) ? this.renderCurrentPlayer() : null}
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
  return state.player;
}

export default connect(mapStateToProps)(Game);
