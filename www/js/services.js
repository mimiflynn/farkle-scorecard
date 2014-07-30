angular.module('farkle.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Players', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var players = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return players;
    },
    get: function(playerId) {
      // Simple index lookup
      return players[playerId];
    }
  }
});
