'use strict';

angular.module('app')
  .directive('spouseData', function(){
    return{
      templateUrl: 'client-bio/clientbio.spouse.html',
      replace: true
    }
  })
