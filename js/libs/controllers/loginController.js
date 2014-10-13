qiscus.controller('loginCtrl',function($rootScope, $injector, $scope, $http, $location){
        $scope.loginAction = function(){
            if($scope.email === "hrxoneread@yahoo.com" && $scope.password ==="testing_chrome"){
                console.log($location);
                $location.path('/popup');
            }else{
                $scope.notif = "Email & Password Invalid";
            }
        }
});