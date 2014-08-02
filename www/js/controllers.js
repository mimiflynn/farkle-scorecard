angular.module('farkle.controllers', [])

    .controller('RulesCtrl', function ($scope) {
    })

    .controller('ScorecardCtrl', function ($scope, $ionicPopup, Players) {
        var newPlayerPopup = {
            template: '<input type="text" ng-model="newPlayer.name">',
            title: 'New Player',
            subTitle: 'Name',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.newPlayer) {
                            console.log('need a name');
                        } else {
                            $scope.players.push($scope.newPlayer);
                            console.log($scope.players);
                        }
                    }
                }
            ]
        };

        $scope.players = Players.all();

        $scope.leftButtons = [
            {
                type: 'button-icon icon ion-navicon'
            }
        ];

        $scope.addNewPlayer = function(){
            $ionicPopup.show(newPlayerPopup);
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
