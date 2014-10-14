'use strict';

qiscus.controller('LoginController', [
	'$scope',
	'$q',
  	'$location',
	'QServiceLogin',
	'QHardCoded',
	'QEndPoints',
	'ch', function($scope, $q, $location, qlogin, qhardcoded, qendpoints, ch) {

		$scope.email = '';
		$scope.password = '';

		this.loginAction = function() {
			qlogin.setUrl(qendpoints.getLoginUrl());
			var loggedIn = qlogin.doLogin($scope.email, $scope.password);

				loggedIn.success(function(data) {
					if (data.success == true) {

						var get_storage = function(token_key) {
							var deferred = $q.defer();

							/*
							check if already has user_token
							*/
							ch.storage.sync.get(token_key, function(items) {
								if (items[token_key]) {
									deferred.resolve(items[token_key]);
								} else {//if not logged in -> token not set yet
									deferred.reject('failed');
								}
							});

							return deferred.promise;
						};

						var check_room = get_storage('room_id');
						//sync token
						ch.storage.sync.set({'user_token': data.token});
						
						check_room.then(function(room) {
							$location.path('/popup');
						}, function(msg) {
							$location.path('/options');
						});

					}
				});
		};

	}
]);
