'use strict';

var app = angular.module('app');

app.controller('PensionFundController',[
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.hasPensionFund = false;
    $scope.client = {
      pensionFund: null
    }

    var getPensionFund = function(){
      ClientService.getPensionFund().then(
        function(results){
          $scope.client.pensionFund = results;
          console.log(results);
          $scope.hasPensionFund = true;

        },
        function(err){
          console.log(err);
        }
      )
    }

    $scope.editPfundCurrencyModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'edit.pfundcurrency.html',
         controller: 'EditPfundCurrencyCtrl',
         size: size,
         resolve: {
           pensionFund: function () {
             return $scope.client.pensionFund;
           }
         }
       });

       modalInstance.result.then(function (pfund) {
         ClientService.editLocalCurrency(pfund.id, pfund.localCurrency).then(
           function(results){
             $scope.client.pensionFund.localCurrency = results.localCurrency
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

    $scope.editPfundERAModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'edit.pfundera.html',
         controller: 'EditPfundERACtrl',
         size: size,
         resolve: {
           pensionFund: function () {
             return $scope.client.pensionFund;
           }
         }
       });

       modalInstance.result.then(function (pfund) {
         ClientService.editEarlyRetirementAge(pfund.id, pfund.earlyRetirementAge).then(
           function(results){
             $scope.client.pensionFund.earlyRetirementAge = results.earlyRetirementAge
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     $scope.editPfundLRAModal = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'edit.pfundlra.html',
          controller: 'EditPfundLRACtrl',
          size: size,
          resolve: {
            pensionFund: function () {
              return $scope.client.pensionFund;
            }
          }
        });

        modalInstance.result.then(function (pfund) {
          ClientService.editLateRetirementAge(pfund.id, pfund.lateRetirementAge).then(
            function(results){
              $scope.client.pensionFund.lateRetirementAge = results.lateRetirementAge
              console.log(results);
            }, function(err) {
              console.log(err);
            }
          );
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

    $scope.editPfundBalanceModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'edit.pfundbalance.html',
         controller: 'EditPfundBalanceCtrl',
         size: size,
         resolve: {
           pensionFund: function () {
             return $scope.client.pensionFund;
           }
         }
       });

       modalInstance.result.then(function (pfund) {
         ClientService.editPensionFundBalance(pfund.id, pfund.balance).then(
           function(results){
             $scope.client.pensionFund.balance = results.balance
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

    $scope.editPfundNameModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'edit.pfundname.html',
         controller: 'EditPfundNameCtrl',
         size: size,
         resolve: {
           pensionFund: function () {
             return $scope.client.pensionFund;
           }
         }
       });

       modalInstance.result.then(function (pfund) {
         ClientService.editPensionFundName(pfund.id, pfund.name).then(
           function(results){
             $scope.client.pensionFund.name = results.name
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

    $scope.createPensionFundModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.pfund.html',
         controller: 'CreatePensionFundCtrl',
         size: size,
         resolve: {
           pensionFund: function () {
             return $scope.client.pensionFund;
           }
         }
       });

       modalInstance.result.then(function (pensionFund) {
         if (pensionFund.localCurrency != "Local currency" || pensionFund.localCurrency != undefined){

           ClientService.createPensionFund(
             pensionFund.name,
             pensionFund.balance,
             pensionFund.earlyAge,
             pensionFund.lateAge,
             pensionFund.localCurrency
           ).then(
             function(results){
               $scope.client.pensionFund = results;
               $scope.hasPensionFund = true;
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

    getPensionFund();
  }
])
.controller('CreatePensionFundCtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    name: null,
    balance: null,
    earlyAge: null,
    lateAge: null,
    localCurrency: "Local currency"
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('EditPfundNameCtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    id: pensionFund.id,
    name: pensionFund.name
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('EditPfundBalanceCtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    id: pensionFund.id,
    balance: pensionFund.balance
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('EditPfundERACtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    id: pensionFund.id,
    earlyRetirementAge: pensionFund.earlyRetirementAge
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('EditPfundLRACtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    id: pensionFund.id,
    lateRetirementAge: pensionFund.lateRetirementAge
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('EditPfundCurrencyCtrl', function ($scope, $rootScope, $uibModalInstance, pensionFund, ClientService) {

  $scope.pfund = {
    id: pensionFund.id,
    localCurrency: pensionFund.localCurrency
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.pfund);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
