// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', ['ionic', 'ngCordova','ngMaterial', 'ui.calendar', 'ui.bootstrap'])

app.run(function($ionicPlatform) {

	$ionicPlatform.ready(function() {
	});
});

app.config(function($stateProvider, $urlRouterProvider) {

  
/**
 * Profile, Binder, and Content is connected up into a fully connected state machine
 */

  $stateProvider

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profile'
  })
  .state('content', {
    abstract:true,
    url:'/content',
    templateUrl:'templates/content.html'
  })

  .state('content.sections', {
    url: '/:sec/:sub',
    templateUrl: function($stateParams){
      console.log($stateParams);
      return 'templates/sections/' + $stateParams.sub + '.html';
    },
  })
  
  .state('binder', {
      url: '/binder',
      templateUrl: 'templates/binder/binder.html',
      controller: 'MainCtrl'
  })

  
  // Old State are below
  // TODO: Remove and consolidate them into sub states of main three
  .state('binder-calendar', {
      url: '/binder/calendar',
      templateUrl: 'templates/binder/binder-calendar.html',
      controller: 'MainCtrl'
  })
	
  .state('binder-toDo', {
      url: '/binder/toDo',
      templateUrl: 'templates/binder/binder-toDo.html',
      controller: 'MainCtrl'
  })
	
  .state('binder-ideas', {
      url: '/binder/ideas',
      templateUrl: 'templates/binder/binder-ideas.html',
      controller: 'MainCtrl'
  })

  .state('binder-jobApps', {
      url: '/binder/jobApps',
      templateUrl: 'templates/binder/binder-jobApps.html',
      controller: 'MainCtrl'  
  })

  .state('binder-contacts', {
    url: '/binder/contacts',
    templateUrl: 'templates/binder/binder-contacts.html',
    controller: 'MainCtrl'
  })
  


  .state('selfAssess', {
    url: '/selfAssess',
    templateUrl: 'templates/SelfAssessment.html',
    controller: 'MainCtrl'
  })


  $urlRouterProvider.otherwise('/');
})


app.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate) {
  // Provide an optional true or false
  // to force specific open or close state
  $scope.toggleSideNav = function(bool) {
    if(bool == undefined){
      $ionicSideMenuDelegate.toggleLeft();
      return
    }
    $ionicSideMenuDelegate.toggleLeft(bool);
  };
})

/**
 * Simple TimeLine to direct the content page to sections of book
 */
app.directive('timeLine',[function(){
  return {
    transclude: true,
    templateUrl: 'templates/timeline.html',
    controller: (function($scope, $state){

      $scope.contentOutline = contentOutline;

      $scope.getSubsection = function(section){
        return contentOutline[section].sectionOrder;
      }

      $scope.jumpToSection = function(params){
        if(!('sec' in params && 'sub' in params)){
          throw new Error("Missing required parameter for jumping into sections.")
        }
        console.log('Routing to content/'+params.sec +'/'+ params.sub)
        $state.go('content.sections',params);
        // Using parent scope
        $scope.toggleSideNav(false);

        // TODO Scroll to position using lastLocation
      };

      $scope.getHistory = function(){
        var hist = localStorage.getItem('hist');
        // We havent entered history before, set defaults
        // TODO test and handle inital setup or defaults regarding user data
        if(hist == null){
          return populateDefaults()
        }
        return hist;
      }

      // Helper to create inital required data
      // using the contentOutline object as a seed
      function populateDefaults(){
        // Iterate over each major section
        contentOutline.ordering.map(function(sec){
          // Iterate over each minor subsection
          var section = contentOutline[sec]
          section.sectionOrder.map(function(sub){
            // create the required objects for handling reading state
            var subsection = section[sub] = {
              isComplete:false,
              lastRead:null,
              lastLocation:0
            };
          })
        }) // end maps
        return contentOutline;
      }
    })
  }
}])
