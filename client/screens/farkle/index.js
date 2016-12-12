import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PlayerList from './components/player-list';

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

    this.handleOpen = this.handleOpen.bind(this);
    this.pollUsers = this.pollUsers.bind(this);
  }

  pollUsers () {
    this.pollInterval = window.setInterval(() => {
      this.props.dispatch(fetchPlayers());
    }, 2000);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      loading: isEmpty(nextProps.players)
    });
  }

  componentDidMount () {
    this.props.dispatch(fetchPlayers());
    // Example of client side polling
    // this.pollUsers();
  }

  componentWillUnmount () {
    // clearInterval(this.pollInterval);
  }

  handleOpen () {
    this.setState({ drawerOpen: (!this.state.drawerOpen) });
  }

  render () {
    return (
      <div className={divClasses}>
        {(!this.state.loading) ? <PlayerList {...this.props} /> : <Loading />}
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

