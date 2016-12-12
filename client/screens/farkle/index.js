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
      drawerOpen: false,
      loading: true
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm (player) {
    this.props.dispatch(savePlayer(player));
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
      <div>
        <div className="container">
          <PlayerForm submitForm={this.handleSubmitForm} />
        </div>
        <div className="container">
          {(!this.state.loading) ? <PlayerList {...this.props} /> : <Loading />}
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

function mapStateToProps ({ player }) {
  return player.players;
}

export default connect(mapStateToProps)(Farkle);

