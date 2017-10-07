'use strict';

angular.module('app')
.controller('SignUpController', ['Client','$scope','AuthService','ClientService','$state',
  function(Client,$scope,AuthService, ClientService, $state) {

      //initialize $scope.client
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
      $scope.date = new Date().getFullYear();
      $scope.isNotConfirmed = false;
      $scope.checkPassword = function(){

        if ($scope.client.password === $scope.client.passwordConfirm && $scope.client.password != undefined) {
          $scope.isNotConfirmed = false;
        }
        else {
          $scope.isNotConfirmed = true;
        }
      }
      /**
       * [initialize client registration]
       * @return {[promise]} [client data created on success]
       */
      $scope.startRegistration = function (){
        if ($scope.client.password === $scope.client.passwordConfirm && $scope.client.password != undefined){
            var client = {
              username: $scope.client.firstname + "_" + $scope.client.lastname,
              email: $scope.client.email,
              password: $scope.client.password
            }
            console.log(client);

            //register client, take client.username, client.email, client.password
            $scope.res = AuthService.register(
              client.username,
              client.email,
              client.password
            )
            .then(
              function(res) {
                //create dob format yyyy-mm-dd
                var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;

                //create client data
                $scope.data = ClientService.createClientdata(
                  $scope.client.firstname,
                  $scope.client.lastname,
                  null,
                  dob,
                  $scope.client.sex,
                  res.client.id
                ).then()
                $state.transitionTo('activate');
              });

          }else{
            //password missmatch handling
          }
      };



  }])
