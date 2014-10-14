'use strict';

var qiscus = angular.module('qiscus', [
    'qiscus.providers',
    'qiscus.factories',
    'qiscus.services',
    'ngRoute'
]);

/*
setup angular routing
*/
qiscus.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/options', {
            templateUrl: 'options.html',
            controller: 'OptionsController'
        })
        .when('/popup', {
            templateUrl: 'popup.html',
            controller: 'ListCommentsController',
            controllerAs: 'listComment'
        });
});

/*
application main method
*/
qiscus.run(['$rootScope', '$injector', '$location' ,'$q', function($rootScope, $injector, $location, $q) {

    var ch = $injector.get('ch');

    var get_storage = function(token_key) {
        var deferred = $q.defer();

        /*
        check if already has user_token
        */
        ch.storage.sync.get(token_key, function(items) {
            if (items[token_key]) {
                deferred.resolve(items.user_token);
            } else {//if not logged in -> token not set yet
                deferred.reject('failed');
            }
        });

        return deferred.promise;
    };

    chrome.browserAction.setBadgeText({text: ''});
    var token = get_storage('user_token');
    token.then(function(token) {

        $rootScope.token_value = token;

        var room = get_storage('room_id');
        room.then(function(roomId) {
            $location.path('/popup');
        }, function(msg) {
            $location.path('/options');
        });


    }, function(msg) {
        $location.path('/login');
    });

}]);
