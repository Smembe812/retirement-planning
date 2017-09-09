/**
*@ngdoc ClientBioController
*@description handles CRUD operations for Clients Bio
*/
'use strict';

angular.module('app')
  .controller('ClientBioController', ['$scope', '$state', '$rootScope', 'ClientService',
  function($scope, $state, $rootScope, ClientService){

    function addMedicalCondition(){
      $scope.res = ClientService.createMedicalConditions(
        $scope.client.medicalCondition
      ).then(
        function(results){
          console.log(results);
        },
        function(err){
          console.log(err);
        }
      );
    }

    function addClientData() {
      $scope.res = ClientService.createClientdata(
        $scope.client.firstname,
        $scope.client.lastname,
        $scope.client.maritalStatus,
        $scope.client.dob
      ).then(
        function(results){
          console.log(results);
        },
        function(err){
          console.log(err);
        }
      )
    }

    function addSpouse(){
        $scope.res = ClientService.createSpouse(
          $scope.client.spousename,
          $scope.client.dob,
          $scope.client.occupation
        ).then(
          function(results){
            console.log(results);
          },
          function(err){
            console.log(err);
          }
        )
    }

    function getClientBio(){
    console.log(ClientService.getClientBio());
    }

    $scope.addBio = function(){
      //addMedicalCondition();
      //addClientData();
      //addSpouse();
      getClientBio();
    }
  }
]);
