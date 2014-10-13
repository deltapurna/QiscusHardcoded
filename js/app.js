'use strict'

qiscus.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("popup", {
      url: "/popup",
      templateUrl: "popup.html",
      controller: "ListCommentsController",
      authenticate: true
    })
    .state("login", {
      url: "/login",
      templateUrl: "ogin.html",
      controller: "LoginCtrl",
      authenticate: false
    });
  // Send to login if the URL was not found
  $urlRouterProvider.otherwise("/login");
});