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


    /**
     * [deletes a liability]
     * @param  {[string]} size      [size of modal, sm, md, lg]
     * @param  {[object]} liability [liability object to delete]
     * @return {[void]}           [description]
     */
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
         //if creditor liabilities, delete it
         if (liability.creditor){
           ClientService.deleteCreditor(liability.id).then(
             function(result){
               getliabilities();
             },
             function(err){
               console.log(err);
             }
           )

         }
         //if any other liability, delete it too
         else {
           ClientService.deleteLiability(liability.id).then(

             /**
              * [on successful deletion, reload liabilities]
              * @param  {[object]} result [description]
              */
             function(result){
               getliabilities(); //reloads liabilities
             },

             /**
              * [on deletion failiure, do something]
              * @param  {[object]} err [error object]
              */
             function(err){
               console.log(err);
             }
           )
         }
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     /**
      * [edit a liability]
      * @param  {[string]} size      [size of modal, sm, md, ls]
      * @param  {[object]} liability [liability object to be edited]
      * @return {[void]}           [description]
      */
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

         //if creditor liabilities, edit it
         if (liability.creditor) {
           ClientService.updateCreditor(
              liability.id,
              liability.name,
              liability.address,
              liability.outstandingValue
            ).then(

              /**
               * [on successful edition, reload liabilities]
               * @param  {[object]} result [description]
               */
              function(results){
                getliabilities();

              },

              /**
               * [on editing failiure, do something]
               * @param  {[err]} result [error object]
               */
              function(err){
                console.log(err);
              }
            )


         }

         //if any other liabilities, edit it
         else {
           ClientService.updateLiability(
             liability.id,
             liability.accountNumber,
             liability.outstandingValue,
             liability.endDate,
             liability.rate,
             liability.instalmentAmount
           ).then(
             /**
              * [on successful edition, reload liabilities]
              * @param  {[object]} result [description]
              */
             function(results){
               getliabilities();
             },

             /**
              * [on editing failiure, do something]
              * @param  {[err]} result [error object]
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

     /**
      * [get client's liabilities]
      * @return {[type]} [description]
      */
    var getliabilities = function(){
      ClientService.getliabilities().then(
        function(results){

          //if results has items, create the pie chart and $scope.client liabilities
          if (results.length > 0) {
            $scope.client.liabilities = results;
            $scope.hasLiability = true;
            var orr = [] //Array to hold chart items
            var sum = 0; //total value of liabilities
            angular.forEach(results, function(item, index) {

              //create item for chart
              var obo = {
                label: item.type,
                value: item.outstandingValue
              }

              sum = sum + item.outstandingValue; //compute the total

              orr.push(obo); //add the item to the chart array
            });

            $scope.myDataSource = {
              //chart configurations
              chart: {
                caption: "Liabilities Total",
                subCaption: "Percentages of all liabilities",
                use3DLighting: "0",
                startingAngle: "310",
                showLabels: "0",
                numberPrefix: "$",
                showPercentValues: "1",
                defaultCenterLabel: "Total of liabilities: $"+(sum),
                centerLabel: "Revenue from $label: $value",
                showLegend: "1",
                centerLabelBold: "1",
                theme: "fint"

              },

              //data to be displaed on the chart
              data: orr
            };
          }

        },

        /**
         * [what to do when there is an error getting liabilities]
         * @param  {[object]} err [object of error]
         */
        function(err){
          console.log(err);
        }
      )
    }

    getliabilities(); //run the get function
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
