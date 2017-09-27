    'use strict';
angular.module('app', [
    'ui.router',
    'angularCSS',
    'lbServices',
    'ui.bootstrap',
    'ngTagsInput',
    'ngAnimate',
    'ngMask'
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
      .state('website-contact-us', {
        url: '/website/contact-us',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/contact-us.html'
      })
      .state('website-privacy-statement', {
        url: '/website/privacy-statement',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/privacy-statement.html'
      })
      .state('website-why-choose-rpc', {
        url: '/website/why-choose-rpc',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/why-choose-rpc.html'
      })
      .state('website-services-pension-fund-management-and-administration-assessments', {
        url: '/website/services/pension-fund-management-and-administration-assessments',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.pension-fund-management-and-administration-assessments.html'
      })
      .state('website-services-investment-advisory', {
        url: '/website/services/investment-advisory',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.investment-advisory.html'
      })
      .state('website-services-training-programmes-for-trustees', {
        url: '/website/services/training-programmes-for-trustees',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.training-programmes-for-trustees.html'
      })
      .state('website-services-training-programmes-for-individuals', {
        url: '/website/services/training-programmes-for-individuals',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.training-programmes-for-individuals.html'
      })
      .state('website-services-will-preparation-and-execution', {
        url: '/website/services/will-preparation-and-execution',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.will-preparation-and-execution.html'
      })
      .state('website-services-counselling', {
        url: '/website/services/counselling',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.counselling.html'
      })
      .state('website-services-customer-records-management', {
        url: '/website/services/customer-records-management',
        css: [
          '../assets/css/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/now-ui-kit.css',
          '../assets/css/rpc.css'
        ],
        templateUrl: '../website/services.customer-records-management.html'
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
      .state('register', {
        url: '/register',
        templateUrl: 'views/signup.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/ct-paper.css',
          '../assets/css/rpc.css',
          '../assets/css/examples.css'
        ],
        controller: 'SignUpController'
      })
      .state('activate', {
        url: '/activate',
        templateUrl: 'views/activate.account.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/ct-paper.css',
          '../assets/css/rpc.css',
          '../assets/css/examples.css'
        ],
        controller: 'SignUpController'
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
      })
      .state('planner-bio', {
        url: '/planner/bio',
        templateUrl: '../client-bio/clientbio.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'ClientBioController',
        authenticate: true
      })
      .state('planner-dependants', {
        url: '/planner/dependants',
        templateUrl: '../dependants/dependants.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'DependantsController',
        authenticate: true
      })
      .state('planner-pension-fund', {
        url: '/planner/pension-fund',
        templateUrl: '../pension-fund/pfund.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'PensionFundController',
        authenticate: true
      })
      .state('planner-cash-in-flow', {
        url: '/planner/cash-in-flow',
        templateUrl: '../cash-in-flow/cashin.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'CashInFLowController',
        authenticate: true
      })
      .state('planner-cash-out-flow', {
        url: '/planner/cash-out-flow',
        templateUrl: '../cash-out-flow/cashout.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'CashOutFLowController',
        authenticate: true
      })
      .state('planner-work', {
        url: '/planner/work',
        templateUrl: '../work/work.view.html',
        css: [
          '../signin/bootstrap.min.css',
          '../assets/css/animate.css',
          '../assets/css/paper-dashboard.css',
          '../assets/css/rpc.css',
          '../assets/css/ng-tags-input.min.css',
          '../assets/css/themify-icons.css'
        ],
        controller: 'ClientWorkController',
        authenticate: true
      });
    $urlRouterProvider.otherwise('website/home');
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
