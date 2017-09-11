'use strict';

angular.module('app')
.controller('SignUpController', ['Client','$scope','AuthService','ClientService','$state',
  function(Client,$scope,AuthService, ClientService, $state) {
      $scope.client = {
        firstname: null,
        lastname: null,
        password: null,
        passwordConfirm: null,
        sex: "Choose your gender",
        birthmonth: "Month",
        birthday: null,
        birthyear: null
      }

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
        .then(
          function(res) {
            console.log(res);
            var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
            console.log(dob);
            $scope.data = ClientService.createClientdata(
              $scope.client.firstname,
              $scope.client.lastname,
              null,
              dob,
              $scope.client.sex,
              res.client.id
            ).then()
            $state.transitionTo('signin');
          });

      }else{

      }
      };



  }])
