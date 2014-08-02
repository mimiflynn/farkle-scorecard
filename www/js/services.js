angular.module('farkle.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Players', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var players = [
            {
                id: 0,
                name: 'Mimi Flynn'
            }, {
                id: 1,
                name: 'Anna Chapman'
            }, {
                id: 2,
                name: 'Annette Haynes'
            }, {
                id: 3,
                name: 'Zac'
            }
        ];

        return {
            all: function () {
                return players;
            },
            get: function (playerId) {
                // Simple index lookup
                return players[playerId];
            }
        }
    });
