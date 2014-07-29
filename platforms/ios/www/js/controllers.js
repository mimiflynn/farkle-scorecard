angular.module('starter.controllers', [])

.controller('RulesCtrl', function($scope) {
})

.controller('ScorecardCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ReferenceCtrl', function($scope) {
})

.controller('StandingsCtrl', function($scope) {
});
