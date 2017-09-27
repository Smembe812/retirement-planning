'use strict';

var app = angular.module('app');

app.controller('CashOutFLowController', [
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.hasCashOutFlow = false;

    $scope.client = {
      cashOutFlow: {},
      currency: null
    }

    /**
     * [get the cash out flow data for cllient]
     */
    var getCashOutFlow = function(){
      ClientService.getCashOutFlow().then(
        function(results){
          getCurrency();
          $scope.client.cashOutFlow = results;
          console.log(results);
          $scope.hasCashOutFlow = true;
        },
        function(err){
          console.log(err);
        }
      )
    }

    var getCurrency = function(){
      ClientService.getPensionFund().then(
        function(results){
          $scope.client.currency = results.localCurrency;
          console.log(results);
          $scope.hasPensionFund = true;

        },
        function(err){
          console.log(err);
        }
      )
    }

    getCashOutFlow();

    $scope.createCashOutFlowModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.cashout.html',
         controller: 'CreateCashOutCtrl',
         size: size,
         resolve: {
           cashOutFlow: function () {
             return $scope.client.cashOutFlow;
           }
         }
       });


       modalInstance.result.then(function (cashout) {
         ClientService.createCashOutFlow(
              cashout.bills,
              cashout.lifeInsurancePolicyPremiums,
              cashout.medicalCover,
              cashout.propertyInsurance,
              cashout.vehicleInsurance,
              cashout.roadTaxes,
              cashout.vehicleMaintanance,
              cashout.rentalPayables,
              cashout.cityRates,
              cashout.groundRent,
              cashout.travelEntertainment,
              cashout.mortageRepayment,
              cashout.loanRepayments,
              cashout.gas,
              cashout.schoolFees,
              cashout.donations,
              cashout.groceries,
              cashout.food,
              cashout.clothing,
              cashout.telephone
         ).then(
           function(results){
               $scope.client.cashOutFLows = results;
               $scope.hasCashOutFlow = true;
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

  }])
  .controller('CreateCashOutCtrl', function ($scope, $rootScope, $uibModalInstance, cashOutFlow, ClientService) {

    $scope.cashout = {
      bills: 0,
      lifeInsurancePolicyPremiums: 0,
      medicalCover: 0,
      propertyInsurance: 0,
      vehicleInsurance: 0,
      roadTaxes: 0,
      vehicleMaintanance: 0,
      rentalPayables: 0,
      cityRates: 0,
      groundRent: 0,
      travelEntertainment: 0,
      mortageRepayment: 0,
      loanRepayments: 0,
      gas: 0,
      schoolFees: 0,
      donations: 0,
      groceries: 0,
      food: 0,
      clothing: 0,
      telephone: 0
    }


    $scope.ok = function () {
      $uibModalInstance.close($scope.cashout);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
