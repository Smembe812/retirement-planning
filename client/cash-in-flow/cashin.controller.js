'use strict';

var app = angular.module('app');

app.controller('CashInFLowController', [
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.hasCashInFlow = false;

    $scope.client = {
      cashInFlow: {},
      currency: null
    }

    var getCashInFlow = function(){
      ClientService.getCashInFlow().then(
        function(results){
          getCurrency();
          $scope.client.cashInFlow = results;
          $scope.hasCashInFlow = true;
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

    $scope.createCashInFlowModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.cashin.html',
         controller: 'CreateCashInCtrl',
         size: size,
         resolve: {
           cashInFlow: function () {
             return $scope.client.cashInFlow;
           }
         }
       });

       modalInstance.result.then(function (cashin) {
         ClientService.createCashInFlow(
            cashin.pensionContributions,
            cashin.insurancepolicyPremiums,
            cashin.dividendsReInvested,
            cashin.investmentInterest,
            cashin.reInvestedBusinessesNetSurpluses,
            cashin.salaryMonthlyContributions,
            cashin.propertyRentals,
            cashin.partTimeWork,
            cashin.other
         ).then(
           function(results){
               $scope.client.cashInFLows = results;
               $scope.hasCashInFlow = true;
             console.log(results);
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     $scope.editOther = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'edit.other.html',
          controller: 'OtherCtrl',
          size: size,
          resolve: {
            other: function () {
              return $scope.client.cashInFlow.other;
            }
          }
        });

        modalInstance.result.then(function (other) {
          ClientService.editOther($scope.client.cashInFlow.id, other).then(
            function(results){
              $scope.client.cashInFlow.other = other;
              console.log(results);
            }, function(err) {
              console.log(err);
            }
          );
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.editPartTimeWork = function (size) {
        angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
         var modalInstance = $uibModal.open({
           animation: true,
           templateUrl: 'edit.parttime.html',
           controller: 'PartTimeWorkCtrl',
           size: size,
           resolve: {
             partTimeWork: function () {
               return $scope.client.cashInFlow.partTimeWork;
             }
           }
         });

         modalInstance.result.then(function (partTimeWork) {
           ClientService.editPartTimeWork($scope.client.cashInFlow.id, partTimeWork).then(
             function(results){
               $scope.client.cashInFlow.partTimeWork = partTimeWork;
               console.log(results);
             }, function(err) {
               console.log(err);
             }
           );
         }, function () {
           $log.info('Modal dismissed at: ' + new Date());
         });
       };

       $scope.editPropertyRentals = function (size) {
         angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'edit.propertyrentals.html',
            controller: 'PropertyRentalsCtrl',
            size: size,
            resolve: {
              propertyRentals: function () {
                return $scope.client.cashInFlow.propertyRentals;
              }
            }
          });

          modalInstance.result.then(function (propertyRentals) {
            ClientService.editPropertyRentals(
              $scope.client.cashInFlow.id,
              propertyRentals
            ).then(
              function(results){
                $scope.client.cashInFlow.propertyRentals = propertyRentals;
                console.log(results);
              }, function(err) {
                console.log(err);
              }
            );
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };

        $scope.editSalaryMonthlyContributions = function (size) {
          angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
           var modalInstance = $uibModal.open({
             animation: true,
             templateUrl: 'edit.salary.html',
             controller: 'SalaryMonthlyContributionsCtrl',
             size: size,
             resolve: {
               salaryMonthlyContributions: function () {
                 return $scope.client.cashInFlow.salaryMonthlyContributions;
               }
             }
           });

           modalInstance.result.then(function (salaryMonthlyContributions) {
             ClientService.editSalaryMonthlyContributions(
               $scope.client.cashInFlow.id,
               salaryMonthlyContributions
             ).then(
               function(results){
                 $scope.client.cashInFlow.salaryMonthlyContributions = salaryMonthlyContributions;
                 console.log(results);
               }, function(err) {
                 console.log(err);
               }
             );
           }, function () {
             $log.info('Modal dismissed at: ' + new Date());
           });
         }

           $scope.editReInvestedBusinessesNetSurpluses = function (size) {
             angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
              var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'edit.surpluses.html',
                controller: 'ReInvestedBusinessesNetSurplusesCtrl',
                size: size,
                resolve: {
                  reInvestedBusinessesNetSurpluses: function () {
                    return $scope.client.cashInFlow.reInvestedBusinessesNetSurpluses;
                  }
                }
              });

              modalInstance.result.then(function (reInvestedBusinessesNetSurpluses) {
                ClientService.editReInvestedBusinessesNetSurpluses(
                  $scope.client.cashInFlow.id,
                  reInvestedBusinessesNetSurpluses
                ).then(
                  function(results){
                    $scope.client.cashInFlow.reInvestedBusinessesNetSurpluses = reInvestedBusinessesNetSurpluses;
                    console.log(results);
                  }, function(err) {
                    console.log(err);
                  }
                );
              }, function () {
                $log.info('Modal dismissed at: ' + new Date());
              });
            }

            $scope.editInvestmentInterest = function (size) {
              angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
               var modalInstance = $uibModal.open({
                 animation: true,
                 templateUrl: 'edit.interest.html',
                 controller: 'InvestmentInterestCtrl',
                 size: size,
                 resolve: {
                   investmentInterest: function () {
                     return $scope.client.cashInFlow.investmentInterest;
                   }
                 }
               });

               modalInstance.result.then(function (investmentInterest) {
                 ClientService.editInvestmentInterest($scope.client.cashInFlow.id, investmentInterest).then(
                   function(results){
                     $scope.client.cashInFlow.investmentInterest = investmentInterest;
                     console.log(results);
                   }, function(err) {
                     console.log(err);
                   }
                 );
               }, function () {
                 $log.info('Modal dismissed at: ' + new Date());
               });
             }

             $scope.editDividendsReInvested = function (size) {
               angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
                var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'edit.dividends.html',
                  controller: 'DividendsReInvestedCtrl',
                  size: size,
                  resolve: {
                    dividendsReInvested: function () {
                      return $scope.client.cashInFlow.dividendsReInvested;
                    }
                  }
                });

                modalInstance.result.then(function (dividendsReInvested) {
                  ClientService.editDividendsReInvested($scope.client.cashInFlow.id, dividendsReInvested).then(
                    function(results){
                      $scope.client.cashInFlow.dividendsReInvested = dividendsReInvested;
                      console.log(results);
                    }, function(err) {
                      console.log(err);
                    }
                  );
                }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
                });
              }

              $scope.editInsurancepolicyPremiums = function (size) {
                angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
                 var modalInstance = $uibModal.open({
                   animation: true,
                   templateUrl: 'edit.insurance.html',
                   controller: 'InsurancepolicyPremiumsCtrl',
                   size: size,
                   resolve: {
                     insurancepolicyPremiums: function () {
                       return $scope.client.cashInFlow.insurancepolicyPremiums;
                     }
                   }
                 });

                 modalInstance.result.then(function (insurancepolicyPremiums) {
                   ClientService.editInsurancepolicyPremiums($scope.client.cashInFlow.id, insurancepolicyPremiums).then(
                     function(results){
                       $scope.client.cashInFlow.insurancepolicyPremiums = insurancepolicyPremiums;
                       console.log(results);
                     }, function(err) {
                       console.log(err);
                     }
                   );
                 }, function () {
                   $log.info('Modal dismissed at: ' + new Date());
                 });
               }

               $scope.editPensionContributions = function (size) {
                 angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');
                  var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'edit.pension.html',
                    controller: 'PensionContributionCtrl',
                    size: size,
                    resolve: {
                      pensionContributions: function () {
                        return $scope.client.cashInFlow.pensionContributions;
                      }
                    }
                  });

                  modalInstance.result.then(function (pensionContributions) {
                    ClientService.editPensionContributions($scope.client.cashInFlow.id, pensionContributions).then(
                      function(results){
                        $scope.client.cashInFlow.pensionContributions = pensionContributions;
                        console.log(results);
                      }, function(err) {
                        console.log(err);
                      }
                    );
                  }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                  });
                }

     getCashInFlow();

  }
])
.controller('CreateCashInCtrl', function ($scope, $rootScope, $uibModalInstance, cashInFlow, ClientService) {

  $scope.cashin = {
    pensionContributions: 0,
    insurancepolicyPremiums: 0,
    dividendsReInvested: 0,
    investmentInterest: 0,
    reInvestedBusinessesNetSurpluses: 0,
    salaryMonthlyContributions: 0,
    propertyRentals: 0,
    partTimeWork: 0,
    other: 0
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('OtherCtrl', function ($scope, $rootScope, $uibModalInstance, other, ClientService) {

  $scope.cashin = {
    other: other
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.other);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('PartTimeWorkCtrl', function ($scope, $rootScope, $uibModalInstance, partTimeWork, ClientService) {

  $scope.cashin = {
    partTimeWork: partTimeWork
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.partTimeWork);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('PropertyRentalsCtrl', function ($scope, $rootScope, $uibModalInstance, propertyRentals, ClientService) {

  $scope.cashin = {
    propertyRentals: propertyRentals
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.propertyRentals);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('SalaryMonthlyContributionsCtrl', function ($scope, $rootScope, $uibModalInstance, salaryMonthlyContributions, ClientService) {

  $scope.cashin = {
    salaryMonthlyContributions: salaryMonthlyContributions
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.salaryMonthlyContributions);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('ReInvestedBusinessesNetSurplusesCtrl', function ($scope, $rootScope, $uibModalInstance, reInvestedBusinessesNetSurpluses, ClientService) {

  $scope.cashin = {
    reInvestedBusinessesNetSurpluses: reInvestedBusinessesNetSurpluses
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.reInvestedBusinessesNetSurpluses);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('InvestmentInterestCtrl', function ($scope, $rootScope, $uibModalInstance, investmentInterest, ClientService) {

  $scope.cashin = {
    investmentInterest: investmentInterest
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.investmentInterest);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('PensionContributionCtrl', function ($scope, $rootScope, $uibModalInstance, pensionContributions, ClientService) {

  $scope.cashin = {
    pensionContributions: pensionContributions
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.pensionContributions);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('InsurancepolicyPremiumsCtrl', function ($scope, $rootScope, $uibModalInstance, insurancepolicyPremiums, ClientService) {

  $scope.cashin = {
    insurancepolicyPremiums: insurancepolicyPremiums
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.insurancepolicyPremiums);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('DividendsReInvestedCtrl', function ($scope, $rootScope, $uibModalInstance, dividendsReInvested, ClientService) {

  $scope.cashin = {
    dividendsReInvested: dividendsReInvested
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.cashin.dividendsReInvested);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
