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
    //console.log($rootScope.currentUser.id);

    $scope.isCollapsed = true;
    $scope.spousepresence = true;
    $scope.tags;
    var clone = {}
    $scope.client = {}
    $scope.animationsEnabled = true;
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.openModal = function (size) {
      angular.element(document).find('.modal-dialog')
        .addClass('animated fadeInDown');

       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'update.dob.html',
         controller: 'updateDobCtrl',
         size: size,
         resolve: {
           client: function () {
             return $scope.client;
           }
         }
       });

       modalInstance.result.then(function (client) {
         ClientService.updateDob($rootScope.$id, client.dob).then(
           function(results){
             $scope.client = client;
           },
           function(err){
             console.log(err);
           }
         )

       }, function () {
         $log.info('Modal dismissed at: ' + new Date());
       });
     };
     /**
      * [open modal for client name update]
      * @param  {[string]} size [size of modal]
      * @return {[modal]}      [description]
      */
     $scope.openUpdateNameModal = function (size) {
       angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'update.name.html',
          controller: 'UpdateNameCtrl',
          size: size,
          resolve: {
            client: function () {
              return $scope.client;
            }
          }
        });

        modalInstance.result.then(function (client) {
          ClientService.updateName(
            $rootScope.$id,
            client.firstname,
            client.lastname
          ).then(
            function(results){
              $scope.client = client;
              console.log($scope.client);
            },
            function(err){
              console.log(err);
            }
          )
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.openUpdateSpouseNameModal = function (size) {
        angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

         var modalInstance = $uibModal.open({
           animation: true,
           templateUrl: 'update.spouse.html',
           controller: 'UpdateSpouseNameCtrl',
           size: size,
           resolve: {
             spouse: function () {
               return $scope.client.spouse;
             }
           }
         });

         modalInstance.result.then(function (spouse) {
           ClientService.updateSpouseName(spouse.id, spouse.name).then(
             function(results){
               $scope.client.spouse = spouse;
             }, function(err) {
               console.log(err);
             }
           )
         }, function () {
           $log.info('Modal dismissed at: ' + new Date());
         });
       };

       $scope.openCreateSpouseModal = function (size) {
         angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'create.spouse.html',
            controller: 'CreateSpouseCtrl',
            size: size,
            resolve: {
              spouse: function () {
                return $scope.client.spouse;
              }
            }
          });

          modalInstance.result.then(function (client) {
            ClientService.createSpouse(client.spouse.name, client.spouse.dob, client.spouse.occupation).then(
              function(results){
                $scope.client.spouse = client.spouse;
                $scope.spousepresence = true;
              }, function(err) {
                console.log(err);
              }
            );

            ClientService.updateMaritalStatus($scope.client.dataid, client.maritalStatus).then(
              function(results){
                console.log(results);
              },
              function(err){
                console.log(err);
              }
            );
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };

       $scope.updateSpouseDoBModal = function (size) {
         angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update.spouseDoB.html',
            controller: 'SpouseDoBUpCtrl',
            size: size,
            resolve: {
              spouse: function () {
                return $scope.client.spouse;
              }
            }
          });

          modalInstance.result.then(function (spouse) {
            ClientService.updateSpouseDoB(spouse.id, spouse.dob).then(
              function(results){
                $scope.client.spouse = spouse;
              }, function(err) {
                console.log(err);
              }
            )
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };

        $scope.updateSpouseOccupationModal = function (size) {
          angular.element(document).find('.modal-dialog').addClass('animated fadeInDown');

           var modalInstance = $uibModal.open({
             animation: true,
             templateUrl: 'update.spouseocc.html',
             controller: 'SpouseOccUpCtrl',
             size: size,
             resolve: {
               spouse: function () {
                 return $scope.client.spouse;
               }
             }
           });

           modalInstance.result.then(function (spouse) {
             ClientService.updateSpouseOccupation(
               spouse.id,
               spouse.occupation
             ).then(
               function(results){
                 $scope.client.spouse = spouse;
               }, function(err) {
                 console.log(err);
               }
             )
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
    $scope.spouseData = false;

    $scope.openClosed = function(){
      if ($scope.medicalData) {
        $scope.medicalData = false;
      }
      if ($scope.spouseData) {
        $scope.spouseData = false;
      }
      $scope.closed = true;
    }

    $scope.openMedData = function() {
      if ($scope.closed) {
        $scope.closed = false;
      }
      if ($scope.spouseData) {
        $scope.spouseData = false;
      }
      $scope.medicalData = true;
    }

    $scope.openSpouseData = function() {
      if ($scope.closed) {
        $scope.closed = false;
      }
      if ($scope.medicalData) {
        $scope.medicalData = false;
      }
      $scope.spouseData = true;
    }
    /**
     * [initialize client scope]
     */
    $scope.ph = ClientService.getClientBio().then(
      function(bio){

        function marital(){
          if(bio.clientData.maritalStatus != null){
            $scope.spousepresence = true;
            return bio.clientData.maritalStatus;
          }else {
            $scope.spousepresence = false;
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
          spouse: bio.spouses,
          medicalConditions: [],
          dataid: bio.clientData.id
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
            $scope.client.medicalConditions.push(resolved);
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
          ClientService.getMedicalConditions().then(
            function(results){
              console.log(results);
              $scope.client.medicalConditions = results;
            }
          )
        },
        function(err){
          console.log(err);
        }
      )
    }


    var tata = ClientService.getMedicalConditions().then(
        function(conditions){

          $scope.client.medicalConditions = conditions;
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

angular.module('app').controller('updateDobCtrl', function ($scope, $rootScope, $uibModalInstance, client, ClientService) {

  $scope.client = {
    birthday: null,
    birthmonth: null,
    birthyear: null,
    instance: client
  }


  $scope.ok = function () {
    var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    $scope.client.instance.dob = dob;
    console.log(dob);
    $uibModalInstance.close($scope.client.instance);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('UpdateNameCtrl', function ($scope, $rootScope, $uibModalInstance, client, ClientService) {


  $scope.client = client;

  $scope.ok = function () {
    var fullname = $scope.client.firstname + " " +$scope.client.lastname;
    $scope.client.fullname = fullname;
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('UpdateSpouseNameCtrl', function ($scope, $rootScope, $uibModalInstance, $state, spouse, ClientService) {

  $scope.client = {
    firstname: null,
    lastname: null,
    spouse: spouse
  }

  $scope.ok = function () {
    var name = $scope.client.firstname+" "+$scope.client.lastname;

    $scope.client.spouse.name = name;

    $uibModalInstance.close($scope.client.spouse);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('SpouseDoBUpCtrl', function ($scope, $rootScope, $uibModalInstance, spouse, ClientService) {

  $scope.client = {
    birthday: null,
    birthmonth: null,
    birthyear: null,
    spouse: spouse
  }


  $scope.ok = function () {
    var dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    $scope.client.spouse.dob = dob;
    console.log($scope.client.spouse);

    $uibModalInstance.close($scope.client.spouse);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('SpouseOccUpCtrl', function ($scope, $rootScope, $uibModalInstance, spouse, ClientService) {

  $scope.client = {
    occupation: null,
    spouse: spouse
  }

  $scope.ok = function () {
    $scope.client.spouse.occupation = $scope.client.occupation;
    $uibModalInstance.close($scope.client.spouse);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app').controller('CreateSpouseCtrl', function ($scope, $rootScope, $uibModalInstance, spouse, ClientService) {
  $scope.isCollapsed = false;
  $scope.client = {
    occupation: null,
    maritalStatus: "Choose your marital status",
    birthmonth: "Month",
    spouse: spouse
  }
  $scope.wecollapse = function(){
    if ($scope.client.maritalStatus === "Married"){
      $scope.isCollapsed = true;
    }else {
      $scope.isCollapsed = false;
    }
  }


  $scope.ok = function () {
    $scope.client.spouse.occupation = $scope.client.occupation;
    $scope.client.spouse.name = $scope.client.firstname+" "+$scope.client.lastname;
    $scope.client.spouse.dob = $scope.client.birthyear+"-"+$scope.client.birthmonth+"-"+$scope.client.birthday;
    $uibModalInstance.close($scope.client);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
