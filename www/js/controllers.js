angular.module('farkle.controllers', [])

    .controller('RulesCtrl', function ($scope) {
    })

    .controller('ScorecardCtrl', function ($scope, Players) {
        $scope.players = Players.all();

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon',
                tap: function (e) {
                    console.log('Going back!');
                }
            }
        ];
    })

    .controller('playerDetailCtrl', function ($scope, $stateParams, Players) {
        $scope.player = Players.get($stateParams.playerId);
    })

    .controller('ReferenceCtrl', function ($scope) {
    })

    .controller('StandingsCtrl', function ($scope) {
    });
