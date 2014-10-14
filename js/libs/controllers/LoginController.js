'use strict';

qiscus.controller('LoginController', [
	'$scope',
  '$location',
	'QServiceLogin',
	'QHardCoded',
	'QEndPoints',
	'ch', function($scope, $location, qlogin, qhardcoded, qendpoints, ch) {

		$scope.email = '';
		$scope.password = '';

		this.loginAction = function() {
			qlogin.setUrl(qendpoints.getLoginUrl());
			var loggedIn = qlogin.doLogin($scope.email, $scope.password);

				loggedIn.success(function(data) {
					if (data.success == true) {
						//sync token
						ch.storage.sync.set({'user_token': data.token});
            console.log('logged in');
					}
				});
		};

	}
]);
