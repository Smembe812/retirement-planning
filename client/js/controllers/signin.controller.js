'use strict';
angular.module('app')
  .controller('SigninController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state){
      $scope.user = {
        email: 'useremail@gmail.com',
        password: 'xxxxxxxx'
      };
      $scope.loginPage = true;
      $scope.signIn = function() {
        AuthService.login($scope.client.email, $scope.client.password)
          .then(function() {

            // return to saved returnTo state before redirection to login
            if ($scope.returnTo && $scope.returnTo.state) {
              $state.go(
                $scope.returnTo.state.name,
                $scope.returnTo.params
              );
              // maintain the inherited rootscope variable returnTo
              // but make the returnTo state of it null,
              // so it can be used again after a new login.
              $scope.returnTo.state  = null;
              $scope.returnTo.params = null;
              return;
            }
            // or go to the default state after login
            $state.go('home');
          });
    };
  }
]);
