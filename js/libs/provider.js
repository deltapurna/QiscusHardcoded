'use strict';

var providers = angular.module('qiscus.providers', []);

/**
setup all Qiscus api endpoints
*/
providers.provider('QEndPoints', function() {
    //base url to send api
    var baseUrl = 'https://qiscus-staging.herokuapp.com/api/v1/mobile/';
    var mainUrl = 'https://qiscus-staging.herokuapp.com/';

    /*
    all endpoints
    */
    var endpoints = {};
        endpoints.login     = 'users/sign_in.json';
        endpoints.logout    = 'users/sign_out';
        endpoints.postComment   = 'postcomment';
        endpoints.getComments   = 'topic/4427/comment/100000/token/';
        endpoints.getTopics     = 'topics';
        endpoints.getRooms      = 'rooms';

    /*
    build an url for api request
    */
    var buildUrl = function(part) {
        return baseUrl + part;
    };

    /*
    getter method
    */
    this.$get = function() {
        return {
            getBaseUrl: function() {
                return baseUrl;
            },
            setBaseUrl: function(url) {
                baseUrl = url;
            },
            setMainUrl: function(url) {
                mainUrl = url;
            },
            resetBaseUrl: function() {
                baseUrl = 'http://qisc.us/api/';
            },
            getLoginUrl: function() {
                return mainUrl + endpoints.login;
            },
            getLogoutUrl: function() {
                return mainUrl + endpoints.logout;
            },
            getPostCommentUrl: function() {
                return buildUrl(endpoints.postComment);
            },
            getListCommentsUrl: function() {
                return buildUrl(endpoints.getComments);
            },
            getListTopicsUrl: function() {
                return buildUrl(endpoints.getTopics);
            },
            getListRoomsUrl: function() {
                return buildUrl(endpoints.getRooms);
            },
            setLoginUrl: function(url) {
                endpoints.login = url;
            },
            setLogoutUrl: function(url) {
                endpoints.logout = url;
            },
            setPostCommentUrl: function(url) {
                endpoints.postComment = url;
            },
            setListCommentsUrl: function(url) {
                endpoints.getComments = url;
            },
            setListTopicsUrl: function(url) {
                endpoints.getTopics = url;
            },
            setListRoomsUrl: function(url) {
                endpoints.getRooms = url;
            }
        }
    }
});

/**
setup hardcoded data
*/
providers.provider('QHardCoded', function() {

    /*
    data to hardcoded
    */
    var hardcoded = {};
        hardcoded.user      = 'hrxoneread@yahoo.com';
        hardcoded.password  = 'testing_chrome';
        hardcoded.username  = 'testchrome';
        hardcoded.roomId    = 2246;
        hardcoded.topicId   = 4427;

    /*
    getter methods
    */
    this.$get = function() {
        return {
            getUser: function() {
                return hardcoded.user;
            },
            getPassword: function() {
                return hardcoded.password;
            },
            getRoom: function() {
                return hardcoded.roomId;
            },
            setRoom: function(roomId) {
                hardcoded.roomId = roomId;
            },
            getTopic: function() {
                return hardcoded.topicId;
            },
            setTopic: function(topicId) {
                hardcoded.topicId = topicId;
            },
            getUsername: function() {
                return hardcoded.username;
            }
        }
    }
});
