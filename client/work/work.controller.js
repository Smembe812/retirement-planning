'uses strict';

var app = angular.module('app');

app.controller('ClientWorkController',[
  '$scope',
  '$state',
  '$rootScope',
  'ClientService',
  '$uibModal',
  '$log',
  function($scope, $state, $rootScope, ClientService, $uibModal, $log){
    $scope.client = {
      employer: {}
    }
    $scope.isEmployed = true;

    var getEmploymentDetails = function(){
      ClientService.getEmploymentDetails().then(
        function(results){
          $scope.client.employer = results;
          console.log(results);

        },
        function(err){
          $scope.isEmployed = false;
          console.log(err);
        }
      )
    }


    /**
     * [creates Information about client employers]
     * @param  {[string]} size [indicate size of modal]
     * @return {[type]}      [description]
     */
    $scope.createEmployerModal = function (size) {
      angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'create.employer.html',
         controller: 'CreateEmployerCtrl',
         size: size,
         resolve: {
           employer: function () {
             return $scope.client.employer;
           }
         }
       });

       modalInstance.result.then(function (client) {
         ClientService.createEmploymentDetails(
           client.employer.name,
           client.employer.employmentNumber,
           client.employer.dateFirstJoined,
           client.employer.dateConfirmed,
           client.employer.currentMonthlySalary
         ).then(
           function(results){
             $scope.client.employer = results;
             $scope.isEmployed = true;
           }, function(err) {
             console.log(err);
           }
         );
       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };

     /**
      * [open modal for employer deletion confirmation]
      * @param  {[string]} size [size of modal]
      */
     $scope.deleteEmployerModal = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'delete.employer.html',
          controller: 'DeleteEmployerCtrl',
          size: size,
          resolve: {
            employer: function () {
              return $scope.client.employer;
            }
          }
        });

        modalInstance.result.then(function (employer) {
          if (employer != undefined){
            deleteEmploymentInfo(employer)
          }
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

    /**
     * [calls ClientService to delete employement details]
     * @param  {[object]} employer [employer object]
     */
     var deleteEmploymentInfo = function(employer){
       var dataid = employer.id;
       ClientService.deleteEmploymentDetails(dataid).then(
         function(results){
           console.log(results);
           $scope.isEmployed = false;
         },
         function(err){
           console.log(err);
         }
       );
     }

     /**
      * [open update salary modal then update the salary]
      * @param  {[type]} size [description]
      * @return {[type]}      [description]
      */
     $scope.updateMonthlySalary = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'update.salary.html',
          controller: 'UpdateSalaryCtrl',
          size: size,
          resolve: {
            employer: function () {
              return $scope.client.employer;
            }
          }
        });

        modalInstance.result.then(function (client) {
          if (client != undefined){
            ClientService.updateMonthlySalary(
              client.employer.id,
              client.salary
            ).then(
              function(results){
                $scope.client.employer.currentMonthlySalary = client.salary
                console.log(results);
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

      $scope.updateEmployementNumber = function (size) {
        angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

         var modalInstance = $uibModal.open({
           animation: true,
           templateUrl: 'update.empnum.html',
           controller: 'UpdateEmpNumCtrl',
           size: size,
           resolve: {
             employer: function () {
               return $scope.client.employer;
             }
           }
         });

         modalInstance.result.then(function (client) {
           if (client != undefined){
             ClientService.updateEmployementNumber(
               client.employer.id,
               client.empNum
             ).then(
               function(results){
                 $scope.client.employer.employmentNumber = client.empNum
                 console.log(results);
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

       $scope.updateEmployerName = function (size) {
         angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update.empname.html',
            controller: 'UpdateEmpNameCtrl',
            size: size,
            resolve: {
              employer: function () {
                return $scope.client.employer;
              }
            }
          });

          modalInstance.result.then(function (client) {
            if (client != undefined){
              ClientService.updateEmployerName(
                client.employer.id,
                client.empName
              ).then(
                function(results){
                  $scope.client.employer.name = client.empName
                  console.log(results);
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

       $scope.updateEmployerJoinDate = function (size) {
         angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update.joindate.html',
            controller: 'UpdateJoinDateCtrl',
            size: size,
            resolve: {
              employer: function () {
                return $scope.client.employer;
              }
            }
          });

          modalInstance.result.then(function (client) {
            if (client != undefined){
              ClientService.updateEmployerJoinDate(
                client.employer.id,
                client.date
              ).then(
                function(results){
                  $scope.client.employer.dateFirstJoined = client.date
                  console.log(results);
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

        $scope.updateEmployerConfirmDate = function (size) {
          angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

           var modalInstance = $uibModal.open({
             animation: true,
             templateUrl: 'update.confirmdate.html',
             controller: 'UpdateConfirmDateCtrl',
             size: size,
             resolve: {
               employer: function () {
                 return $scope.client.employer;
               }
             }
           });

           modalInstance.result.then(function (client) {
             if (client != undefined){
               ClientService.updateEmployerConfirmDate(
                 client.employer.id,
                 client.date
               ).then(
                 function(results){
                   $scope.client.employer.dateConfirmed = client.date
                   console.log(results);
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
    getEmploymentDetails();
  }
]);

app.controller('CreateEmployerCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    salary: null,
    jbirthmonth: "Month",
    cbirthmonth: "Month",
    employer: employer
  }


  $scope.ok = function () {
    $scope.client.employer.employmentNumber = $scope.client.employeenumber;
    $scope.client.employer.name = $scope.client.name;
    $scope.client.employer.dateFirstJoined = $scope.client.jbirthyear+"-"+$scope.client.jbirthmonth+"-"+$scope.client.jbirthday;
    $scope.client.employer.dateConfirmed = $scope.client.cbirthyear+"-"+$scope.client.cbirthmonth+"-"+$scope.client.cbirthday;
    $scope.client.employer.currentMonthlySalary = $scope.client.salary;
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('DeleteEmployerCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    employer: employer
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.client.employer);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


app.controller('UpdateSalaryCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    salary: employer.currentMonthlySalary,
    employer: employer
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('UpdateEmpNumCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    empNum: employer.employmentNumber,
    employer: employer
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('UpdateEmpNameCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    empName: employer.name,
    employer: employer
  }


  $scope.ok = function () {
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('UpdateJoinDateCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    birthday: null,
    birthmonth: "Month",
    birthyear: null,
    date: employer.dateFirstJoined,
    employer: employer
  }


  $scope.ok = function () {
    $scope.client.date = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('UpdateConfirmDateCtrl', function ($scope, $rootScope, $uibModalInstance, employer, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    birthday: null,
    birthmonth: "Month",
    birthyear: null,
    date: employer.dateConfirmed,
    employer: employer
  }


  $scope.ok = function () {
    $scope.client.date = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
