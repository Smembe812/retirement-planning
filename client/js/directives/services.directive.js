'use strict';

angular.module('app')
  .directive('services', function(){
    return{
      templateUrl: '../../website/services.directive.html',
      replace: true,
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          element.toggleClass('show')
        });
      }
    }
  })
