'use strict';

angular.module('app')
  .directive('medData', function(){
    return{
      templateUrl: 'client-bio/clientbio.medcond.directive.html',
      replace: true
    }
  })
