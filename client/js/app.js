  'use strict';
angular.module('app', [
    'ui.router',
    'angularCSS',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('website-home', {
        url: '/website/home',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/landing-page.html'
      })
      .state('website-about', {
        url: '/website/about-us',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/about.html'
      })
      .state('website-services-retirement-planning-advisory', {
        url: '/website/services/retirement-planning-advisory',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.retirement-planning-advisory.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.component.html',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        controller: 'SigninController'
      })
      .state('signout', {
        url: '/signout',
        controller: 'SignOutController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'SigninController',
        authenticate: true
      });
    $urlRouterProvider.otherwise('signin');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // redirect to login page if not logged in
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault(); //prevent current page from loading

        // Maintain returnTo state in $rootScope that is used
        // by authService.login to redirect to after successful login.
        // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };

        $state.go('signin');
      }
    });

    // Get data from localstorage after pagerefresh
    // and load user data into rootscope.
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);
