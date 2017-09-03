'use strict';

angular.module('app')
  .controller('SiteController', [$scope,
    function($scope){
      $scope.show = function(){
        $('.dropdown').addClass('show')
      }
    }
  ])
