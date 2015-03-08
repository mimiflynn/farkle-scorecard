angular.module('farkle')
  .factory('Players', function ($resource) {

    var url = 'http://localhost:3000';

    return $resource(url + '/player/:playerId', {
      playerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
