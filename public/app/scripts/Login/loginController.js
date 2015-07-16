'use strict';

(function() {
    angular.module('brewApp.controllers')
        .controller('LoginCtrl', ['$scope', '$http','Auth', 'notifications', LoginController]);

    function LoginController($scope, $http, Auth, notifications) {
        $scope.isLogin = true;
        var login = {}
        login.isAuthorized = false;

        login.ProcessLogin = function() {
           Auth.login(login.username, login.password)
               .then(function(data) {
                   notifications.success('Login successful');
                   notifications.info('received authToken = ' + data);
                   $http.defaults.headers.common['Authorization'] = 'Bearer ' + data;
                   login.isAuthorized = true;
                   login.currentUser = login.username;
               },
               function(err) {
                   notifications.error(err);
                });
        };

        login.secureTest = function() {
            $http.get('/secure')
                .success(function(data) {
                    console.log(data);
                    login.testOutput = data;
                })
                .error(function(error) {
                    console.log(error);
                    login.testOutput = error.error + ', ' + error.error_description;
                });
        };

        $scope.login = login;
    }
})();