'use strict';

angular.module('app')
  .directive('liabilities', function(){
    return{
      templateUrl: 'liabilities/liabilities.card.html',
      replace: true
    }
  })
