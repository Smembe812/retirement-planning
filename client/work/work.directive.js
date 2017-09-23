'use strict';

angular.module('app')
  .directive('workData', function(){
    return{
      templateUrl: 'work/work.form.html',
      replace: true
    }
  })
