function getNextPlayer (players) {
  for (let i = 0; i < players.length - 1; i++) {
    if (players[i].turnCount > players[i + 1].turnCount) {
      return i + 1;
    }
  }
  return 0;
}

function getPrevPlayer (players) {
  const nextPlayer = getNextPlayer(players);
  if (nextPlayer > players.length - 1) {
    return players.length - 1;
  }
  return 0;
}


module.exports = {
  getNextPlayer,
  getPrevPlayer
};

