'use strict';

var factories = angular.module('qiscus.factories', []);

    /*
    setup factory object for lodash -> lodash wrapper
    */
    factories.factory('_', ['$window', function($window) {
        return $window._;
    }]);

    /*
    setup factory for pusher
    */
    factories.factory('pusher', function() {
        return new Pusher('896d049b53f1659213a2', {
            disableStats: true
        });
    });

    /*
    setup factory for chrome api
    */
    factories.factory('ch', ['$window', function($window) {
        return $window.chrome;
    }]);
