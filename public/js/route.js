'use strict'
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var billapp = angular.module('billapp', ['ionic', 'ui.bootstrap', 'ngMaterial', 'moment-picker', '720kb.datepicker', 'angularUtils.directives.dirPagination', 'ds.clock'])
.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [], 
      keys = [];
      
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key); 
              // push this item to our final output array
              output.push(item);
            }
          });
      // return our array which should be devoid of
      // any duplicates
      return output;
    };
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $httpProvider, $logProvider, $provide) {
	$httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
	url: '/login',
    templateUrl: './pages/login/templates/login.htm',
    controller: 'loginPageController'
  })
  .state('maintab', {
    url: '/maintab',
    templateUrl: './pages/tabs/templates/maintab.htm',
    controller: 'maintabController'
  })
  .state('maintab.all', {
    url: '/all',
    templateUrl: './pages/dashboard/templates/dashboardALLtab.htm',
    controller: 'dashboardtabController'
  })
  .state('maintab.enrolled', {
    url: '/enrolled',
    templateUrl: './pages/dashboard/templates/dashboardENROLLtab.htm',
    controller: 'dashboardtabController'
  })
  .state('maintab.register', {
    url: '/register',
    templateUrl: './pages/register/templates/registertab.htm',
    controller: 'registertabController'
  })

  $urlRouterProvider.otherwise('/login');

});