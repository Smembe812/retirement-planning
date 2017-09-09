'use strict';

angular.module('app')
  .directive('clientBio', function(){
    return{
      templateUrl: 'client-bio/clientbio.directive.html',
      replace: true
    }
  })
