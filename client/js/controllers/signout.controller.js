'use strict';

angular.module('app')
.controller('SignOutController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
  AuthService.logout()
    .then(function() {
      $state.go('signin');
    });
}])
