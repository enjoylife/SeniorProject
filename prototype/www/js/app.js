// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('prototype', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('mainMenu', {
    url: '/MainMenu',
    templateUrl: 'templates/MainMenu.html',
    controller: 'MainCtrl'
  })
  
  .state('timeline', {
    url: '/Timeline',
    templateUrl: 'templates/Timeline.html',
    controller: 'MainCtrl'  
  })

  .state('selfAssess', {
    url: '/selfAssess',
    templateUrl: 'templates/SelfAssessment.html',
    controller: 'MainCtrl'
  })

  $urlRouterProvider.otherwise("/MainMenu");
})


.controller('MainCtrl', function($scope, $state) {
  $scope.toTimeline = function(){
    $state.go('timeline');
  }

  $scope.toSelfAssess = function(){
    $state.go('selfAssess');
  }

  /*$scope.menu = [
    { title: 'Timeline'},
    { title: 'Career Binder'},
    { title: 'The Serious Job Seeker'},
    { title: 'Success Stories'},
    { title: 'Why It Works!'},
    { title: 'About Us'}
  ];*/
})
