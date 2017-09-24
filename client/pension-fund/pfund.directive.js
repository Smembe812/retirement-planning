'use strict';

angular.module('app')
  .directive('pensionFund', function(){
    return{
      templateUrl: 'pension-fund/pfund.card.html',
      replace: true
    }
  })
