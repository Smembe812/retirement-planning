'use strict';

var app = angular.module('app');

app.controller('DependantsController',[
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.client = {
      dependants: [],
      currentDependant: null
    }
    $scope.hasDependants = false;

    /**
     * [creates Information about client employers]
     * @param  {[string]} size [indicate size of modal]
     * @return {[type]}      [description]
     */
    $scope.createDependantsModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.dependant.html',
         controller: 'CreateDependantCtrl',
         size: size,
         resolve: {
           dependant: function () {
             return $scope.client.dependants;
           }
         }
       });

       modalInstance.result.then(function (client) {
         ClientService.createDependant(client.name).then(
           function(results){
               $scope.client.dependants.push(results);
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     $scope.editDependantsModal = function (size, depe) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
        console.log(depe);
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'edit.dependant.html',
          controller: 'EditDependantCtrl',
          size: size,
          resolve: {
            dependant: depe
          }
        });

        modalInstance.result.then(function (dependant) {
          ClientService.updateDependant(dependant.id, dependant.name).then(
            function(results){
                getDependants();
              console.log(results);
            }, function(err) {
              console.log(err);
            }
          );
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

     var getDependants = function(){
       ClientService.getDependants().then(
         function(results){
           $scope.client.dependants = results;
           console.log(results);
           $scope.hasDependants = true;
         },
         function(err){
           console.log(err);
         }
       )
     }

     $scope.deleteDependant = function(id){
       ClientService.deleteDependant(id).then(
         function(results){
           getDependants();
           console.log(results);
         },
         function(err){
           console.log(err);
         }
       )
     }

     getDependants();

  }])
  .controller('CreateDependantCtrl', function ($scope, $rootScope, $uibModalInstance, dependant, ClientService) {
    $scope.isCollapsed = false;
    $scope.client = {
      name: null,
      dependant: dependant
    }


    $scope.ok = function () {
      $uibModalInstance.close($scope.client);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('EditDependantCtrl', function ($scope, $rootScope, $uibModalInstance, dependant, ClientService) {
    $scope.isCollapsed = false;
    $scope.client = {
      name: null,
      dependant: dependant
    }


    $scope.ok = function () {
      $uibModalInstance.close($scope.client.dependant);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
