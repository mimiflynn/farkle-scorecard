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
    <h1 className="farkle-loading-title">Loading</h1>
  </div>
);

class Farkle extends Component {

  constructor (props) {
    super(props);

    this.state = {
      loading: true
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm (player) {
    const players = this.props.players;
    players[player] = {};
    this.props.dispatch(savePlayer(players));
  }

  renderPlayerList () {
    return (this.props.players.message) ? 'Add players' : <PlayerList players={this.props.players} />;
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
          {(!this.state.loading) ? this.renderPlayerList() : <Loading />}
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
  players: PropTypes.object,
  dispatch: PropTypes.func,
  route: PropTypes.object
};

function mapStateToProps (state) {
  console.log('state', state);
  return state.player;
}

export default connect(mapStateToProps)(Farkle);

