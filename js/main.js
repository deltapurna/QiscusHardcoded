'use strict';

var qiscus = angular.module('qiscus', [
    'qiscus.providers',
    'qiscus.factories',
    'qiscus.services',
    'ngRoute'
]);

/*
application main method
*/
qiscus.run(['$rootScope', '$injector', function($rootScope, $injector) {

    var endpoints = $injector.get('QEndPoints');
    var hardcoded = $injector.get('QHardCoded');
    var login = $injector.get('QServiceLogin');
    var ch = $injector.get('ch');

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
        }
    });

    chrome.browserAction.setBadgeText({text: ''});

}]);
