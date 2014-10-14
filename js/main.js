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

    var deferred = $q.defer();

    /*
    check if already has user_token
    */
    ch.storage.sync.get('user_token', function(items) {
        if (items.user_token) {

            //set to $rootScope
            $rootScope.token_value = data.token;

            /*
            watch token_value properties changes
            trigger an event to broadcast to all child controllers
            */
            $rootScope.$watch('token_value', function(newVal, oldVal) {
                if (newVal) {
                    $rootScope.$broadcast('this_token_value', newVal);
                }
            });

            deferred.resolve('logged in');

        } else {//if not logged in -> token not set yet
            deferred.reject('not logged in');
        }
    });

    chrome.browserAction.setBadgeText({text: ''});
    console.log(deferred);

}]);
