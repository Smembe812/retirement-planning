/**
*@ngdoc ClientBioController
*@description handles CRUD operations for Clients Bio
*/
'use strict';

angular.module('app')
  .controller('ClientBioController', ['$scope', '$state', '$rootScope', 'ClientService',
  function($scope, $state, $rootScope, ClientService){

    $scope.isCollapsed = true;
    $scope.tags;

    /**
     * [shows spouse name and occupation inputs when maritalStatus is married]ion]
     */
    $scope.wecollapse = function(){
      console.log($scope.client.maritalStatus);
      if ($scope.client.maritalStatus === "married"){
        $scope.isCollapsed = false;
      }else {
        $scope.isCollapsed = true;
        console.log($scope.client.maritalStatus);
      }
    }

    $scope.data = {
     model: null,
     availableOptions: [
       {value: 'married', name: 'Married'},
       {value: 'notmarried', name: 'Not Married'}
     ]
    };

    /**
     * [initialize client scope]
     */
    $scope.ph = ClientService.getClientBio().then(
      function(bio){
        $scope.client = {
          firstname: bio.clientData.firstName,
          lastname: bio.clientData.lastName,
          maritalStatus: bio.clientData.maritalStatus
        };
      }
    );

    $scope.opened = false;
    /**
     * [datepicker opener]
     * @return {[void]} [description]
     */
    $scope.open = function() {
       $scope.opened = true;
       console.log($scope.opened);
     };

     /**
      * [creates medical conditions in db]
      */
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

    /**
     * [create clientdata in the db]
     */
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

    /**
     * [add's spouse of client in db]
     */
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

    /**
     * [cget client bio from db]
     * @return {[object]} [clientbio object]
     */
    function getBio(){
      $scope.res = ClientService.getClientBio().then(
        function(clientbio){
          return clientbio;
        }
      )
    }

    function print(){
      console.log($scope.tags);
    }

    $scope.addBio = function(){
      //addMedicalCondition();
      //addClientData();
      //addSpouse();
      //getBio();
      print();
    }
  }
]);
