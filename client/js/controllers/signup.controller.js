'use strict';

angular.module('app')
.controller('SignUpController', ['Client','$scope','AuthService','$state',
  function(Client,$scope,AuthService, $state) {


      $scope.startRegistration = function (){
        if ($scope.client.password === $scope.client.passwordConfirm && $scope.client.password != undefined){
            var client = {
              username: $scope.client.firstname + "_" + $scope.client.lastname,
              email: $scope.client.email,
              password: $scope.client.password
            }
            console.log(client);
            
        $scope.res = AuthService.register(
          client.username,
          client.email,
          client.password
        )
        .then(function() {
          $state.transitionTo('signin');
        });

      }else{

      }
      };



  }])
