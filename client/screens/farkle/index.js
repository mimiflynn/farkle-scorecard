import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PlayerList from './components/player-list';
import Reference from './components/reference';
import Rules from './components/rules';

import { fetchPlayers } from '../../actions/player';
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
        {(!this.state.loading) ? <PlayerList {...this.props} /> : <Loading />}
        <Rules />
        <Reference />
      </div>
    );
  }
}

Farkle.propTypes = {
  players: PropTypes.array,
  dispatch: PropTypes.func,
  route: PropTypes.object
};

function mapStateToProps ({ players }) {
  return players;
}

export default connect(mapStateToProps)(Farkle);

