'use strict';

angular.module('app')
  .directive('dependants', function(){
    return{
      templateUrl: 'dependants/dependants.form.html',
      replace: true
    }
  })
