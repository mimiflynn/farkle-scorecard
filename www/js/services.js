angular.module('farkle.services', [])
    .factory('Players', ['$resource', function ($resource) {

        var url = 'http://192.168.1.129:3000/player/:playerId';

        return $resource(url, {
            playerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
