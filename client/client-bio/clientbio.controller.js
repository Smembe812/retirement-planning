/**
*@ngdoc ClientBioController
*@description handles CRUD operations for Clients Bio
*/
'use strict';

angular.module('app')
  .controller('ClientBioController',[
    '$scope',
    '$state',
    '$rootScope',
    'ClientService',
    '$uibModal',
    '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){


    $scope.isCollapsed = true;
    $scope.tags;
    var clone = {}
    $scope.client = {}
    $scope.animationsEnabled = true;
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.openModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'myModalContent.html',
         controller: 'ModalInstanceCtrl',
         size: size,
         resolve: {
           items: function () {
             return $scope.items;
           }
         }
       });

       modalInstance.result.then(function (selectedItem) {
         $scope.selected = selectedItem;
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     $scope.openUpdateNameModal = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'updateName.html',
          controller: 'UpdateNameCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    /**
     * [shows spouse name and occupation inputs when maritalStatus is married]ion]
     */
    $scope.wecollapse = function(){
      if ($scope.client.maritalStatus === "Married"){
        $scope.isCollapsed = false;
      }else {
        $scope.isCollapsed = true;
      }
    }

    $scope.data = {
     model: null,
     availableOptions: [
       {value: 'Married', name: 'Married'},
       {value: 'Not married', name: 'Not Married'}
     ]
    };

    $scope.closed = false;
    $scope.medicalData = false;

    $scope.openClosed = function(){
      if ($scope.medicalData) {
        $scope.medicalData = false;
      }
      $scope.closed = true;
    }

    $scope.openMedData = function() {
      if ($scope.closed) {
        $scope.closed = false;
      }
      $scope.medicalData = true;
    }
    /**
     * [initialize client scope]
     */
    $scope.ph = ClientService.getClientBio().then(
      function(bio){

        function marital(){
          if(bio.clientData.maritalStatus != null){
            return bio.clientData.maritalStatus;
          }else {
            console.log(bio.clientData.maritalStatus);
            return "Choose your marital status";
          }
        }
        var fullname = bio.clientData.firstName + " " +bio.clientData.lastName;
        $scope.client = {
          firstname: bio.clientData.firstName,
          lastname: bio.clientData.lastName,
          fullname: fullname,
          sex: bio.clientData.sex,
          maritalStatus: marital(),
          dob: bio.clientData.dob,
          spousename: bio.spouses.name,
          occupation: bio.spouses.occupation,
          medicalConditions: []
        };

        clone = {
          client: {
            firstname: bio.clientData.firstName,
            lastname: bio.clientData.lastName,
            maritalStatus: "Choose your marital status",
            dob: bio.clientData.dob,
            id: bio.clientData.id,
            medicalConditions: [],
            spouse:bio.spouses
          }
        };
        $scope.wecollapse();
      }
    );


     function updateStatus(){
       if ($scope.client.maritalStatus != "Choose your marital status" && $scope.client.maritalStatus != null) {

         $scope.upstatus = ClientService.updateMaritalStatus(
           clone.client.id,
           $scope.client.maritalStatus
         ).then(
           function(resolved){
             console.log(resolved);

           },
           function(err){
             console.log(err);
           }
         )
       }
     }

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
    $scope.updateDob = function(){
      var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
      var update = ClientService.updateDob(
        $rootScope.$id,
        dob
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
      if ($scope.client.spousename != null && $scope.client.dob != null && $scope.client.occupation) {

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
      }else {
        //handle spouse input error
      }
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

    $scope.addMedicalConditions = function(){
      var mcarray = $scope.tags;

      console.log(mcarray.length);
      for (var i = 0; i < mcarray.length; i++) {

        $scope.mc = ClientService.createMedicalConditions(mcarray[i].text).then(
          function(resolved){
            console.log(resolved);
          },
          function(err){
            console.log(err);
          }
        )
      }
    }

    $scope.deleteMedicalCondition = function(id){
      var del = ClientService.destroyMedicalCondition(id)
      .then(
        function(result){
          console.log(result);
        },
        function(err){
          console.log(err);
        }
      )
    }


    var tata = ClientService.getMedicalConditions().then(
        function(tags){
          var tagsarray = []
          for (var i = 0; i < tags.length; i++) {
            tagsarray[i] = {
              "text": tags[i].name,
              "id": tags[i].id
            }
          }
          $scope.client.medicalConditions = tagsarray;
          console.log($scope.client.medicalConditions);
        }, function(err){
          console.log(err);
        }
      );

    $scope.addBio = function(){
      //addMedicalCondition();
      //addClientData();
      updateStatus();
      addSpouse();
      //getBio();
      //print();
    }
  }
]);

angular.module('app').controller('ModalInstanceCtrl', function ($scope, $rootScope, $uibModalInstance, items, ClientService) {

  $scope.items = items;
  $scope.opened = false;
  $scope.client = {
    birthday: null,
    birthmonth: null,
    birthyear: null,
  }

  /**
   * [datepicker opener]
   * @return {[void]} [description]
   */
  $scope.open = function() {
     $scope.opened = true;
     console.log($scope.opened);
   };


  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    console.log(dob);
    var update = ClientService.updateDob(
      $rootScope.$id,
      dob
    ).then(
      function(results){
        console.log(results);
      },
      function(err){
        console.log(err);
      }
    )
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('UpdateNameCtrl', function ($scope, $rootScope, $uibModalInstance, items, ClientService) {

  $scope.items = items;
  $scope.opened = false;
  $scope.client = {
    firstname: null,
    lastname: null,
    dataId: null
  }
  var t = ClientService.getClientBio().then(
    function (results){
      $scope.client.dataId = results.clientData.id;
    }
  )
  /**
   * [datepicker opener]
   * @return {[void]} [description]
   */
  $scope.open = function() {
     $scope.opened = true;
     console.log($scope.opened);
   };


  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    console.log($scope.client);
    var update = ClientService.updateName(
      $scope.client.dataId,
      $scope.client.firstname,
      $scope.client.lastname
    ).then(
      function(results){
        console.log(results);
      },
      function(err){
        console.log(err);
      }
    )
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
