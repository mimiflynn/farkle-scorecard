angular.module('farkle')

.controller('RulesCtrl', function ($scope) {
})

.controller('ScorecardCtrl', function ($scope, $ionicPopup, Players) {

  $scope.newPlayer = {};

  $scope.findPlayers = function () {
    Players.query(function (players) {
      $scope.players = players;
      console.log($scope.players);
    });
  };

  $scope.leftButtons = [
  {
    type: 'button-icon icon ion-navicon'
  }
  ];

  $scope.addNewPlayer = function () {

    var newPlayerPopup = {
      template: '<input type="text" name="name" ng-model="newPlayer.name">',
      title: 'New Player',
      subTitle: 'Name',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function (e) {
          if (!$scope.newPlayer.name) {

            console.log('need a name', $scope.newPlayer);

          } else {

            var player = new Players($scope.newPlayer);
            console.log('player: ', player)

            player.$save(function (response) {

              console.log('saved!', response);

                                    // update list with new player
                                    $scope.findPlayers();
                                  });
          }
        }
      }
      ]
    };

    return $ionicPopup.show(newPlayerPopup);
  }

  console.log($scope);
})

.controller('playerDetailCtrl', function ($scope, $stateParams, Players) {
  $scope.player = Players.get($stateParams.playerId);
})

.controller('ReferenceCtrl', function ($scope) {
})

.controller('StandingsCtrl', function ($scope) {
});
