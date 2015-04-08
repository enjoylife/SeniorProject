// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', [ 'ionic', 'ngCordova','ionic.ion.headerShrink', 'ui.calendar', 'ui.bootstrap'])

app.run(function($ionicPlatform, $localstorage, $ionicScrollDelegate, $rootScope, $state, $ionicHistory) {
      (function getHistory(){
        var hist = JSON.parse(window.localStorage.getItem('hist'));
        // We havent entered history before, set defaults
        // TODO test and handle inital setup or defaults regarding user data
     
        if(hist == null){
           populateDefaults();
           console.log("populateDefaults");
        } else {
            //contentOutline = hist;
            console.log('hist');
        }
      })()
	$ionicPlatform.ready(function() {
       // TESTING and DEMO purposes!!
        populateDefaults(); // Always Populate Defaults
        //console.log("populateDefaults() fired.");
     if(window.cordova && window.cordova.plugins.Keyboard) {
          window.cordova.plugins.Keyboard.disableScroll(true);

      }

      //will fire everytime localstorage is accessed
      window.addEventListener('storage', function(e) {
        console.debug(e);
      }, false);

   $rootScope.$on('$viewContentLoaded', 
    function(event){ 
      $ionicScrollDelegate.freezeScroll(true); 
      window.setTimeout(function(){
        $ionicScrollDelegate.freezeScroll(false); 
        $ionicScrollDelegate.resize(); 
        console.log($ionicScrollDelegate.getScrollView().__contentHeight);
      },1500)
   });
	});
	
	
	/* Check app launch count */
	var appLaunchCount = window.localStorage.getItem('launchCount');
	if(appLaunchCount){
	   //If it exists then it is not the first time app launched
	   console.log("NOT first time");
	}else{
	  //First time launch. Set the local storage item
	  window.localStorage.setItem('launchCount',1);
	  console.log("FIRST TIME USER");
	 }
});


app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'MainCtrl',
    //controller: 'profile'
  })

  /**
   * content is the top level view, cant be actually rendered,
   * only is used to create a wrapper around all section content
   */
  .state('content', {
    abstract:true,
    url:'/content',
    templateUrl:'templates/content.html',
    controller:'contentCtrl'
  })

  /**
   * content.sections are dynamically generated routes which render into
   * the ui-view in the content.html template
   */
  .state('content.sections', {
    url: '/:folder/:file',
    templateUrl: function($stateParams){
      console.log($stateParams);
      return 'templates/sections/' + $stateParams.folder +'/'   + $stateParams.file;
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

  .state('binder-asmntResults', {
    url: '/binder/asmntResults',
    templateUrl: 'templates/binder/binder-asmntResults.html',
    controller: 'MainCtrl'
  })

  .state('binder-individualAsmntResults', {
    url: '/binder/asmntResults/individualAsmntResults',
    templateUrl: 'templates/binder/binder-individualAsmntResults.html',
    controller: 'MainCtrl'
  })

  .state('selfAssess', {
    url: '/selfAssess',
    templateUrl: 'templates/SelfAssessment.html',
    controller: 'MainCtrl'
  })

// Holland Assessment
  .state('content.sections.hollandAssess', {
    // url:'/holland',
    templateUrl: 'templates/holland/info.html',
    controller:'holland'
  })

  //Work Values & Priorities Assessment 
  //(not accessible in prototype deliverable)
  .state('workValues', {
    url:'/workValues',
    templateUrl:'templates/selfAsmnt/workValues.html',
    controller:'MainCtrl'
  })

  .state('workValuesResults', {
    url:'/workValuesResults',
    templateUrl:'templates/selfAsmnt/workValuesResults.html',
    controller:'MainCtrl'
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
    templateUrl: 'templates/selfAsmnt/msi/msi_communication.html',
    controller: 'MainCtrl'
  })

  .state('msi_marketing', {
    url: '/msi_marketing',
    templateUrl: 'templates/selfAsmnt/msi/msi_marketing.html',
    controller: 'MainCtrl'
  })

  .state('msi_qa', {
    url: '/msi_qa',
    templateUrl: 'templates/selfAsmnt/msi/msi_qa.html',
    controller: 'MainCtrl'
  })

  .state('msi_analytics', {
    url: '/msi_analytics',
    templateUrl: 'templates/selfAsmnt/msi/msi_analytics.html',
    controller: 'MainCtrl'
  })

  .state('msi_technical', {
    url: '/msi_technical',
    templateUrl: 'templates/selfAsmnt/msi/msi_technical.html',
    controller: 'MainCtrl'
  })

  .state('msi_innovative', {
    url: '/msi_innovative',
    templateUrl: 'templates/selfAsmnt/msi/msi_innovative.html',
    controller: 'MainCtrl'
  })

  .state('msi_teaching', {
    url: '/msi_teaching',
    templateUrl: 'templates/selfAsmnt/msi/msi_teaching.html',
    controller: 'MainCtrl'
  })

  .state('msi_leadership', {
    url: '/msi_leadership',
    templateUrl: 'templates/selfAsmnt/msi/msi_leadership.html',
    controller: 'MainCtrl'
  })

  .state('msi_results', {
    url: '/msi_results',
    templateUrl: 'templates/selfAsmnt/msi/msi_results.html',
    controller: 'MainCtrl'
  })


  $urlRouterProvider.otherwise('/profile');
})








// Helper to create inital required data
// using the contentOutline object as a seed
function populateDefaults(){
  // Iterate over each major section
  contentOutline.map(function(section){
    if(!('title' in section)){
      throw new Error("Missing Title for section");
    }
    // Iterate over each minor subsection
    section['numComplete'] = 0;
    section['lastRead'] = null;
    if(!('sections' in section)){ 
      throw new Error("Missing sections array")}
    section.sections.map(function(sub){
      // create the required objects for handling reading state
      sub['complete'] = false;
      sub['lastRead'] = null;
      sub['lastLocation'] = 0;
    })
  }) // end maps
  return contentOutline;
}

/**
 * Simple TimeLine to direct the content page to sections of book
 */
app.directive('timeLine',[function(){
  return {
    transclude: true,
	  templateUrl: 'templates/Timeline.html',
    controller: (function(){})
  }
}])

//Used for storing objects and converting to and from JSON
app.factory('$localstorage', ['$window', function($window) {
  
  function set(key, value) {
      $window.localStorage[key] = value;
  }
  
  function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
  }
  
  function setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
  }
  
  function getObject(key) {
      return JSON.parse($window.localStorage[key] || '{}');
  }
  
  return {
    set: set,
    get: get,
    setObject: setObject,
    getObject: getObject
  }
}]);

//filter which allows reverse layout of ng-repeat items
app.filter('reverse', function(){
  return function(items) {
    return items.slice().reverse();
  };
});
