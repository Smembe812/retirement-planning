'use strict';

var app = angular.module('app');


app.controller('LiabilityController', [
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.hasLiability = false;
    $scope.myDataSource = {};
    $scope.client = {
      liabilities: []
    }



    $scope.deleteLiability = function (size, liability) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'delete.liability.html',
         controller: 'DeleteLiabilityCtrl',
         size: size,
         resolve: {
           liability: liability
         }
       });

       modalInstance.result.then(function (liability) {
         if (liability.creditor){
           ClientService.deleteCreditor(liability.id).then(
             function(result){
               getliabilities();
             },
             function(err){
               console.log(err);
             }
           )

         }else {
           ClientService.deleteLiability(liability.id).then(
             function(result){
               getliabilities();
             },
             function(err){
               console.log(err);
             }
           )
         }
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

    $scope.editLiability = function (size, liability) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'edit.liability.html',
         controller: 'EditLiabilityCtrl',
         size: size,
         resolve: {
           liability: function () {
             return liability;
           }
         }
       });

       modalInstance.result.then(function (liability) {

         if (liability.creditor) {
           ClientService.updateCreditor(
              liability.id,
              liability.name,
              liability.address,
              liability.outstandingValue
            ).then(
              function(results){
                getliabilities();

              },
              function(err){
                console.log(err);
              }
            )


         }
         else {
           console.log(liability);
           ClientService.updateLiability(
             liability.id,
             liability.accountNumber,
             liability.outstandingValue,
             liability.endDate,
             liability.rate,
             liability.instalmentAmount
           ).then(
             function(results){
               getliabilities();
               console.log(results);
             }, function(err) {
               console.log(err);
             }
           );

         }
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

    /**
     * [creates a liability]
     * @param  {[string]} size [indicate size of modal]
     * @return {[type]}      [description]
     */
    $scope.createLiabilityModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');


       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.liability.html',
         controller: 'createLiabilityCtrl',
         size: size,
         resolve: {
           liability: function () {
             return $scope.client.liabilities;
           }
         }
       });


       modalInstance.result.then(function (liability) {

         //if liability.creditor has values, do creditor model creation
         if (liability.creditor.name != null && liability.creditor.address!= null) {
           ClientService.createCreditor(
             liability.creditor.name,
             liability.creditor.address,
             liability.creditor.outstandingValue
           ).then(
             /**
              * [on success push the returned liability to the array]
              * @param  {[object]} results [return on success]
              * @return {[void]}         [returns nothing]
              */
             function(results){
               getliabilities();
             },

             /**
              * [on failiure, do proper handling]
              * @param  {[object]} err [description]
              * @return {[void]}     [description]
              */
             function(err){
               console.log(err);
             }
           )
         }

         //if liability.creditor is empty, then create a liability from
         //returned liability object
         else {
           ClientService.createLiability(
             liability.accountNumber,
             liability.outstandingValue,
             liability.endDate,
             liability.rate,
             liability.instalmentAmount,
             liability.type
           ).then(

             /**
              * [on success push the returned liability to the array]
              * @param  {[object]} results [return on success]
              * @return {[void]}         [returns nothing]
              */
             function(results){
               getliabilities();
               console.log(results);
             },

             /**
              * [on failiure, do proper handling]
              * @param  {[object]} err [description]
              * @return {[void]}     [description]
              */
             function(err) {
               console.log(err);
             }
           );

         }
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };


    var getliabilities = function(){
      ClientService.getliabilities().then(
        function(results){
          $scope.client.liabilities = results;
          $scope.hasLiability = true;
          var orr = []
          console.log(orr);
          angular.forEach(results, function(item, index) {
            var obo = {
              label: item.type,
              value: item.outstandingValue
            }
            orr.push(obo);
          });

          $scope.myDataSource = {
             chart: {
                 caption: "Liabilities Total",
                 subCaption: "Percentages of all liabilities",
                 use3DLighting: "0",
                 startingAngle: "310",
                 showLabels: "0",
                 numberPrefix: "$",
                 showPercentValues: "1",
                 defaultCenterLabel: "Total revenue: $value",
                 centerLabel: "Revenue from $label: $value",
                 showLegend: "1",
                 centerLabelBold: "1",
                 theme: "fint"

             },
             data: orr
           };
        },
        function(err){
          console.log(err);
        }
      )
    }

    getliabilities();
  }])
  .controller('createLiabilityCtrl', function ($scope, $rootScope, $uibModalInstance, liability, ClientService) {
    $scope.isCollapsed = false;
    $scope.creditorCollapse = false;
    $scope.liability = {
      accountNumber: null,
      outstandingValue: null,
      endDate: null,
      rate: null,
      instalmentAmount: null,
      type: "Liabilities",
      creditor: {
        name: null,
        address: null,
        instalmentAmount: null
      }
    }

    /**
     * [hide or show form fields for liabilities]
     * @return {[void]} [description]
     */
    $scope.wecollapse = function(){
      if ($scope.liability.type !== "Creditors: money you owe other people"){
        $scope.creditorCollapse = false;
        $scope.isCollapsed = true;
      }else if ($scope.liability.type === "Creditors: money you owe other people") {
        $scope.creditorCollapse = true;
        $scope.isCollapsed = false;
      }
      else {
        $scope.isCollapsed = false;
      }
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.liability);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('EditLiabilityCtrl', function ($scope, $rootScope, $uibModalInstance, liability, ClientService) {
    $scope.isCollapsed = false;
    $scope.creditorCollapse = false;
    $scope.liability = {
      id: liability.id,
      accountNumber: liability.accountNumber,
      outstandingValue: liability.outstandingValue,
      endDate: new Date(liability.endDate),
      rate: liability.rate,
      instalmentAmount: liability.instalmentAmount,
      type: liability.type,
      creditor: {
        id: liability.id,
        name: liability.name,
        address: liability.address,
        outstandingValue: liability.outstandingValue,
        creditor: true
      }
    }

    /**
     * [hide or show form fields for liabilities]
     * @return {[void]} [description]
     */
    var wecollapse = function(){
      if ($scope.liability.type !== "Creditors: money you owe other people"){
        $scope.creditorCollapse = false;
        $scope.isCollapsed = true;
      }else if ($scope.liability.type === "Creditors: money you owe other people") {
        $scope.creditorCollapse = true;
        $scope.isCollapsed = false;
      }
      else {
        $scope.isCollapsed = false;
      }
    }

    wecollapse();

    $scope.ok = function () {
      if ($scope.liability.type === "Creditors: money you owe other people") {
        $uibModalInstance.close($scope.liability.creditor);
      }else {
        $scope.liability.creditor = false;
        $uibModalInstance.close($scope.liability);
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('DeleteLiabilityCtrl', function ($scope, $rootScope, $uibModalInstance, liability, ClientService) {
    $scope.liability = {
      id: liability.id,
      type: liability.type,
      creditor: {
        id: liability.id,
        type: liability.type,
        creditor: true
      }
    }


    $scope.ok = function () {
      if ($scope.liability.type === "Creditors: money you owe other people") {
        $uibModalInstance.close($scope.liability.creditor);
      }else {
        $scope.liability.creditor = false;
        $uibModalInstance.close($scope.liability);
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
