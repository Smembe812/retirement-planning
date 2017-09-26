angular.module('app')
  .directive('cashInFlow', function(){
    return{
      templateUrl: 'cash-in-flow/cashin.card.html',
      replace: true
    }
  })
