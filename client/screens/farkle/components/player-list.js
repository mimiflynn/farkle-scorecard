import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableHandle, SortableElement, arrayMove } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::</span>);

const Player = SortableElement(({ player, index }) => (
  <li key={index} className="player-list-item">
    <DragHandle />
    { player }
  </li>
));

const List = SortableContainer(({ players }) => {
  const PlayerList = players.map((player, index) => (
    <Player player={player.name} index={index} key={'player-' + index} />
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
    console.log('onSortEnd', this.props.players);
    this.props.onSortEnd(arrayMove(this.props.players, oldIndex, newIndex));
  }

  render () {
    console.log('props in list', this.props.players);
    return (
      <div>
        <h3>Players</h3>
        <List onSortEnd={this.onSortEnd} players={this.props.players} useDragHandle />
      </div>
    );
  }
}

SortablePlayerList.propTypes = {
  players: PropTypes.array,
  onSortEnd: PropTypes.func
};

export default SortablePlayerList;

