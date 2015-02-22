// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', [ 'ionic', 'ngCordova','ionic.ion.headerShrink', 'ui.calendar', 'ui.bootstrap'])

app.run(function($ionicPlatform) {

	$ionicPlatform.ready(function() {
	});
	
	
	//window.localStorage.clear();
	
	
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
    controller: 'profile'
  })

  /**
   * content is the top level view, cant be actually rendered,
   * only is used to create a wrapper around all section content
   */
  .state('content', {
    abstract:true,
    url:'/content',
    templateUrl:'templates/content.html',
    controller :'contentCtrl'
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



  .state('selfAssess', {
    url: '/selfAssess',
    templateUrl: 'templates/SelfAssessment.html',
    controller: 'MainCtrl'
  })

// Holland Assessment
  .state('hollandAssesment', {
    url:'/holland',
    templateUrl: 'templates/holland/info.html',
    controller:'holland'
  })


  $urlRouterProvider.otherwise('/');
})


app.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate, $localstorage, contactService) {
  // Provide an optional true or false
  // to force specific open or close state
  $scope.toggleSideNav = function(bool) {
    if(bool == undefined){
      $ionicSideMenuDelegate.toggleLeft();
      return
    }
    $ionicSideMenuDelegate.toggleLeft(bool);
  };
  
  /* Get count of contacts for display */
  var load = $localstorage.getObject( 'contacts' );
	if (Object.keys(load).length !== 0) {
		contactService.loadList( load );
	}
  $scope.count = contactService.getContactsService().length;
})

app.controller('contentCtrl',function($scope, $state){
  var
  currentPosition,
  currentContent,
  isComplete;


  $scope.leadIn = function(){
    var section = _.find(contentOutline, function(obj){
      return obj.folder == $state.params.folder;
    })

     var subsection = _.find(section.sections, function(obj){
      return obj.file == $state.params.file;
    })

    return subsection.title
  }



  // Returns null if no more sections and subections
  // otherwise it will return an obejct with the next section and subsection for the router
  var nextSubSection = function(){

    // Total number of folders of content
    var sectionLen    = contentOutline.length -1;

    // Which folder are we in
    var secNum = _.findIndex(contentOutline, function(obj){
      return obj.folder == $state.params.folder;
    })
    var section = contentOutline[secNum];

    // Total number of subsections
    var subsectionLen = section.sections.length - 1;

    // Which file are we in
    var subNum = _.findIndex(section.sections, function(obj){
      return obj.file == $state.params.file;
    })

      var 
      isSecEnd = (secNum == sectionLen),
      isSubEnd = (subNum == subsectionLen) ;

     // If end of all sections and subsections bail
    if(isSecEnd && isSubEnd){
      return null;
    }

    // More subsections show next subsection, stay on this section
    if(!isSubEnd) {
      return {
        folder: $state.params.folder,
        file: section.sections[subNum+1].file
      }
    }
    // Final condition...
    var nextSec = contentOutline[secNum+1];
    return {
      folder:nextSec.folder,
      // First subsection
      file:nextSec.sections[0].file
    }

    // If we reached here some logic went wrong...
    throw new Error("Bad Logic in nextSubSection")
  }
    $scope.goNext = function(){
    var next = nextSubSection();
    $state.go('content.sections', next)
  }

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

      $scope.getTitle = function(section, subsection){
        return contentOutline[section][subsection].title;
      }

      $scope.jumpToSection = function(params){
        if(!('file' in params && 'folder' in params)){
          throw new Error("Missing required parameter for jumping into sections.")
        }
        console.log(params)
        console.log('Routing to content/'+params.folder +'/'+ params.file)
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
        contentOutline.map(function(section){
          // Iterate over each minor subsection
          section.sections.map(function(sub){
            // create the required objects for handling reading state
            sub['isComplete'] = false;
            sub['lastRead'] = null;
            sub['lastLocation'] = 0;
          })
        }) // end maps
        return contentOutline;
      }
    })
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