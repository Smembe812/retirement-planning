'use strict';

angular.module('app')
  .directive('clientDetails', function(){
    return{
      templateUrl: 'client-bio/clientbio.details.html',
      replace: true
    }
  })
