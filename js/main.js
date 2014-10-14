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
        .when('/popup', {
            templateUrl: 'popup.html',
            controller: 'ListCommentsController'
        });
});

/*
application main method
*/
qiscus.run(['$rootScope', '$injector', '$location' ,'$q', function($rootScope, $injector, $location, $q) {

    var endpoints = $injector.get('QEndPoints');
    var hardcoded = $injector.get('QHardCoded');
    var login = $injector.get('QServiceLogin');
    var ch = $injector.get('ch');

    var get_token = function(token_key) {
        var deferred = $q.defer();

        /*
        check if already has user_token
        */
        ch.storage.sync.get(token_key, function(items) {
            if (items.user_token) {
                deferred.resolve(items.user_token);
            } else {//if not logged in -> token not set yet
                deferred.reject('failed');
            }
        });

        return deferred.promise;
    };


    chrome.browserAction.setBadgeText({text: ''});
    var promise = get_token('user_token');
    promise.then(function(token) {
        console.log(token);
    }, function(msg) {
        $location.path('/login');
    });
}]);
