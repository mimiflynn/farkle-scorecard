// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('farkle', ['ionic', 'farkle.controllers', 'farkle.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.rules', {
                url: '/rules',
                views: {
                    'tab-rules': {
                        templateUrl: 'templates/tab-rules.html',
                        controller: 'RulesCtrl'
                    }
                }
            })

            .state('tab.scorecard', {
                url: '/scorecard',
                views: {
                    'tab-scorecard': {
                        templateUrl: 'templates/tab-scorecard.html',
                        controller: 'ScorecardCtrl'
                    }
                }
            })

            .state('tab.reference', {
                url: '/reference',
                views: {
                    'tab-reference': {
                        templateUrl: 'templates/tab-reference.html',
                        controller: 'ReferenceCtrl'
                    }
                }
            })

            .state('tab.standings', {
                url: '/standings',
                views: {
                    'tab-standings': {
                        templateUrl: 'templates/tab-standings.html',
                        controller: 'StandingsCtrl'
                    }
                }
            })

            .state('tab.player-detail', {
                url: '/player/:playerId',
                views: {
                    'tab-scorecard': {
                        templateUrl: 'templates/player-detail.html',
                        controller: 'playerDetailCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/scorecard');

    });

