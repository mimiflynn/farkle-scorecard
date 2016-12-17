import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Modal from 'react-modal';

import Notification from '../components/notification';
import Wrapper from '../components/wrapper';

import PlayerList from './components/player-list';

import { fetchPlayers, savePlayer } from '../../actions/player';
import { isEmpty } from '../../utils/utils';
import { getNextPlayer, getPrevPlayer } from '../../utils/game';


const modalStyles = {
  overlay: {
    top: '55px'
  }
};

class Game extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentPlayer: 0,
      errors: [],
      onBoardModal: false,
      value: {
        score: 0
      }
    };

    this.renderCurrentPlayer = this.renderCurrentPlayer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBoardModalClose = this.handleOnBoardModalClose.bind(this);
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.renderOnBoardModal = this.renderOnBoardModal.bind(this);
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

  handleOnBoardModalClose () {
    this.setState({
      onBoardModal: false
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

  updatePlayerScore (score) {
    let onBoardModal = false;
    const players = this.props.players.slice(0);
    const newScore = players[this.state.currentPlayer].score + score;
    const newTurnCount = players[this.state.currentPlayer].turnCount + 1;

    if (!players[this.state.currentPlayer].onBoard) {
      console.log(players[this.state.currentPlayer].name);
      if (score >= 500) {
        console.log('player is now on the board');
        onBoardModal = true;
      }
    }

    players[this.state.currentPlayer].score = newScore;
    players[this.state.currentPlayer].turnCount = newTurnCount;
    if (!players[this.state.currentPlayer].onBoard && newScore > 500) {
      players[this.state.currentPlayer].onBoard = true;
    }
    this.props.dispatch(savePlayer(players));
    this.setState({ onBoardModal });
  }

  renderCurrentPlayer () {
    const currentPlayer = this.props.players[this.state.currentPlayer];
    const playerIcon = (currentPlayer.icon) ? 'icon-user' : 'icon-wink';
    return (
      <div className="container">
        <h1>Current Player:</h1>
        <h2>
          <span className={playerIcon}>&nbsp;</span>
          {currentPlayer.name}
        </h2>
        {(currentPlayer.onBoard) ? null : this.renderNotification()}
        <div>Current Score: {currentPlayer.score}</div>
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

  renderError (id) {
    return (
      <div className="alert alert-danger" role="alert">
        {this.state.errors[id]}
      </div>
    );
  }

  renderNotification () {
    const currentPlayer = this.props.players[this.state.currentPlayer];
    const alertClassnames = (currentPlayer.onBoard) ? 'alert-success' : 'alert-danger';
    return (
      <Notification className={alertClassnames} duration={10} timer={false}>
        <span className="icon-notification">&nbsp;</span>
        <strong>{currentPlayer.name}</strong> is
        {(currentPlayer.onBoard) ? ' on the board' : ' not on the board. Must score over 500 in one turn to be on the board'}
      </Notification>
    );
  }

  renderOnBoardModal () {
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        contentLabel="Player is now on board!"
        isOpen={this.state.onBoardModal}
        onRequestClose={this.handleOnBoardModalClose}
        style={modalStyles}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.handleModalCloseRequest}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">{this.props.players[getPrevPlayer(this.props.players)].name} is now on the board!</h4>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.handleOnBoardModalClose}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      currentPlayer: getNextPlayer(nextProps.players),
      loading: isEmpty(nextProps.players)
    });
  }

  componentDidMount () {
    this.props.dispatch(fetchPlayers());
  }

  render () {
    return (
      <Wrapper>
        {(this.props.players) ? this.renderCurrentPlayer() : null}
        {(this.props.players) ? <PlayerList currentPlayer={this.state.currentPlayer} players={this.props.players} /> : <Link to="/">Add players</Link>}
        {(this.props.players) ? this.renderOnBoardModal() : null}
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
