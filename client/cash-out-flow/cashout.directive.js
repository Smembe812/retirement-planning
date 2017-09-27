angular.module('app')
  .directive('cashOutFlow', function(){
    return{
      templateUrl: 'cash-out-flow/cashout.card.html',
      replace: true
    }
  })
