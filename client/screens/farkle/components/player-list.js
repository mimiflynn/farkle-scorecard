import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const Player = SortableElement(({ player, index }) => (
  <li key={index} className="player-list-item">
    { player }
  </li>
));

const List = SortableContainer(({ players }) => {
  const PlayerList = Object.keys(players).map((player, index) => (
    <Player player={player} index={index} key={'player-' + index} />
  ));
  return (
    <ul className="player-list">
      { PlayerList }
    </ul>
  );
});

class SortablePlayerList extends Component {
  constructor (props) {
    super(props);

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  render () {
    return (
      <div>
        <h3>Players</h3>
        <List players={this.props.players} />
      </div>
    );
  }
}

SortablePlayerList.propTypes = {
  players: PropTypes.object
};

export default SortablePlayerList;

