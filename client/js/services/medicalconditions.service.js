'use strict';

angular.module('app')
  .factory('MedicalConditionService', ['MedicalCondition', '$q', '$rootScope', '$state',
    function(MedicalCondition, $q, $rootScope, $state) {
      function register(clientid, name, description) {
        return MedicalCondition
          .create({
            name: name,
            description: description,
            clientId: clientid
         })
         .$promise
      }
      return {
        register: register
      };
    }
  ]
);
