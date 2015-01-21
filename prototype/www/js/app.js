// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('/', {
    url: '/',
    templateUrl: '/',
    controller: 'MainCtrl'
  })

  .state('mainMenu', {
    url: '/MainMenu',
    templateUrl: '/templates/MainMenu.html',
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


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            
      //MSI PARTIALS

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




  .state('msi_communication', {
    url: '/msi_communication',
    templateUrl: 'templates/msi_communication.html',
    controller: 'MainCtrl'
  })

  .state('msi_marketing', {
    url: '/msi_marketing',
    templateUrl: 'templates/msi_marketing.html',
    controller: 'MainCtrl'
  })

  .state('msi_qa', {
    url: '/msi_qa',
    templateUrl: 'templates/msi_qa.html',
    controller: 'MainCtrl'
  })

  .state('msi_analytics', {
    url: '/msi_analytics',
    templateUrl: 'templates/msi_analytics.html',
    controller: 'MainCtrl'
  })

  .state('msi_technical', {
    url: '/msi_technical',
    templateUrl: 'templates/msi_technical.html',
    controller: 'MainCtrl'
  })

  .state('msi_innovative', {
    url: '/msi_innovative',
    templateUrl: 'templates/msi_innovative.html',
    controller: 'MainCtrl'
  })

  .state('msi_teaching', {
    url: '/msi_teaching',
    templateUrl: 'templates/msi_teaching.html',
    controller: 'MainCtrl'
  })

  .state('msi_leadership', {
    url: '/msi_leadership',
    templateUrl: 'templates/msi_leadership.html',
    controller: 'MainCtrl'
  })

  .state('msi_results', {
    url: '/msi_results',
    templateUrl: 'templates/msi_results.html',
    controller: 'MainCtrl'
  })

  $urlRouterProvider.otherwise("/MainMenu");
})


app.controller('MainCtrl', function($scope, $state) {
  $scope.toMainMenu = function(){
    $state.go('mainMenu');
  }

  $scope.toTimeline = function(){
    $state.go('timeline');
  }

  $scope.toSelfAssess = function(){
    $state.go('selfAssess');
  }

  $scope.toMSI_communication = function(){
    $state.go('msi_communication');
  }

  $scope.toMSI_marketing = function(){
    $state.go('msi_marketing');
  }

  $scope.toMSI_qa = function(){
    $state.go('msi_qa');
  }

  $scope.toMSI_analytics = function(){
    $state.go('msi_analytics');
  }

  $scope.toMSI_technical = function(){
    $state.go('msi_technical');
  }

  $scope.toMSI_innovative = function(){
    $state.go('msi_innovative');
  }

  $scope.toMSI_teaching = function(){
    $state.go('msi_teaching');
  }

  $scope.toMSI_leadership = function(){
    $state.go('msi_leadership');
  }

  $scope.toResults = function(){
    $state.go('msi_results');
  }
})

//service to collect user input values from surveys
app.factory('scraper', function() {
  //blank array to hold all values
  var values = [];

  function addTotal(val){
    values.push(val);
  }

  //this loop will return the totals that are 6 or higher.
  function output(){
    var out = [];

    values.forEach( function(object){
      if(object.sum >= 6){
        out.push(object);
      }
    });
    //values = [];
    return out;
  }

  function GetMaxVal(){
    return Math.max.apply(Math, values);
  }

  return {
    addTotal: addTotal,
    GetMaxVal: GetMaxVal,
    output: output
  };

});
