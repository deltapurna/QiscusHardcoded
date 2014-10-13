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

    debugger;
    // var email   = hardcoded.getUser();
    var email ="rajapulau@gmail.com";
    var pass    = hardcoded.getPassword();

    /*
    run login
    */
    login.setUrl(endpoints.getLoginUrl());
    var loggedIn = login.doLogin(email, pass);

        /*
        on request success
        */

        debugger;
        loggedIn.success(function(data) {

            /*
            only if login success
            */
            if (data.success == true) {
                $rootScope.token_value = data.token;
            }
        });

    /*
    watch token_value properties changes
    trigger an event to broadcast to all child controllers
    */
    $rootScope.$watch('token_value', function(newVal, oldVal) {
        if (newVal) {
            $rootScope.$broadcast('this_token_value', newVal);
        }
    });

    chrome.browserAction.setBadgeText({text: ''});

}]);
