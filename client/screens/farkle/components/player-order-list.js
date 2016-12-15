import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const Player = SortableElement(({ player, index }) => (
  <li key={index} className="list-group-item player-list-item">
    { player }
  </li>
));

const List = SortableContainer(({ players }) => {
  const PlayerList = players.map((player, index) => (
    <Player player={player.name} index={index} key={'player-' + index} />
  ));
  return (
    <ul className="list-group player-list">
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
    console.log('onSortEnd', this.props.players);
    this.props.onSortEnd(arrayMove(this.props.players, oldIndex, newIndex));
  }

  render () {
    return (
      <div>
        <h2>Players</h2>
        <List onSortEnd={this.onSortEnd} players={this.props.players} />
      </div>
    );
  }
}

SortablePlayerList.propTypes = {
  players: PropTypes.array,
  onSortEnd: PropTypes.func
};

export default SortablePlayerList;

