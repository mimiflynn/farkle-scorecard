import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PlayerForm from './components/player-form';
import PlayerList from './components/player-list';
import Reference from './components/reference';
import Rules from './components/rules';

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

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  handleSubmitForm (player) {
    console.log('handleSubmitForm', player);
    const players = this.props.players.slice(0);
    players.push(player);
    this.props.dispatch(savePlayer(players));
  }

  onSortEnd (players) {
    this.props.dispatch(savePlayer(players));
  }

  renderPlayerList () {
    return (this.props.players) ? <Loading /> : <PlayerList onSortEnd={this.onSortEnd} players={this.props.players} />;
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps);
    this.setState({
      loading: isEmpty(nextProps.players)
    });
  }

  componentDidMount () {
    this.props.dispatch(fetchPlayers());
  }

  render () {
    console.log('props', this.props);
    return (
      <div>
        <div className="container">
          <PlayerForm submitForm={this.handleSubmitForm} />
        </div>
        <div className="container">
          {(!this.state.loading) ? <PlayerList onSortEnd={this.onSortEnd} players={this.props.players} /> : <Loading />}
        </div>
        <div className="container">
          <Rules />
        </div>
        <div className="container">
          <Reference />
        </div>
      </div>
    );
  }
}

Farkle.propTypes = {
  players: PropTypes.array,
  dispatch: PropTypes.func,
  route: PropTypes.object
};

function mapStateToProps (state) {
  console.log('state', state);
  return state.player;
}

export default connect(mapStateToProps)(Farkle);

