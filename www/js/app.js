// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', [ 'ionic', 'ngCordova','ionic.ion.headerShrink', 'ui.calendar', 'ui.bootstrap'])

app.run(function($ionicPlatform, $localstorage, $ionicScrollDelegate, $rootScope) {
      (function getHistory(){
        var hist = JSON.parse(localStorage.getItem('hist'));
        // We havent entered history before, set defaults
        // TODO test and handle inital setup or defaults regarding user data
     
        if(hist == null){
           populateDefaults();
           console.log("populateDefaults");
        } else {
            contentOutline = hist;
            console.log("hist");
        }
      })()
	$ionicPlatform.ready(function() {
       // TESTING and DEMO purposes!!
        populateDefaults(); // Always Populate Defaults
     if(window.cordova && window.cordova.plugins.Keyboard) {
          window.cordova.plugins.Keyboard.disableScroll(true);

      }

   $rootScope.$on('$viewContentLoaded', 
    function(event){ 
      $ionicScrollDelegate.freezeScroll(true); 
      window.setTimeout(function(){
        $ionicScrollDelegate.freezeScroll(false); 
        $ionicScrollDelegate.resize(); 
        console.log($ionicScrollDelegate.getScrollView().__contentHeight);
      },1000)
   });
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

  .state('binder-asmntResults', {
    url: '/binder/asmntResults',
    templateUrl: 'templates/binder/binder-asmntResults.html',
  
  })

  .state('binder-individualAsmntResults', {
    url: '/binder/asmntResults/individualAsmntResults',
    templateUrl: 'templates/binder/binder-individualAsmntResults.html'
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
    url: 'timeline/selfAsmnt/msi/msi_communication',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_communication.html',
    controller: 'MainCtrl'
  })

  .state('msi_marketing', {
    url: '/msi_marketing',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_marketing.html',
    controller: 'MainCtrl'
  })

  .state('msi_qa', {
    url: '/msi_qa',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_qa.html',
    controller: 'MainCtrl'
  })

  .state('msi_analytics', {
    url: '/msi_analytics',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_analytics.html',
    controller: 'MainCtrl'
  })

  .state('msi_technical', {
    url: '/msi_technical',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_technical.html',
    controller: 'MainCtrl'
  })

  .state('msi_innovative', {
    url: '/msi_innovative',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_innovative.html',
    controller: 'MainCtrl'
  })

  .state('msi_teaching', {
    url: '/msi_teaching',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_teaching.html',
    controller: 'MainCtrl'
  })

  .state('msi_leadership', {
    url: '/msi_leadership',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_leadership.html',
    controller: 'MainCtrl'
  })

  .state('msi_results', {
    url: '/msi_results',
    templateUrl: 'templates/timeline/selfAsmnt/msi/msi_results.html',
    controller: 'MainCtrl'
  })


  $urlRouterProvider.otherwise('/profile');
})


app.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate, $localstorage, contactService) {
  
  /* Get count of contacts for display */
  var load = $localstorage.getObject( 'contacts' );
	if (Object.keys(load).length !== 0) {
		contactService.loadList( load );
	}
  $scope.count = contactService.getContactsService().length;

  
  
})

app.controller('timelineCtrl', ['$scope', '$state', '$ionicScrollDelegate', function($scope, $state, $ionicScrollDelegate){
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
        console.log('Routing to content/'+params.folder +'/'+ params.file)
        $state.go('content.sections',params);
        $scope.setHistory();
        console.log(params);

        var section = _.find(contentOutline, function(obj){
          return obj.folder == params.folder;
        })



        var subsection = _.find(section.sections, function(obj){
          return obj.file == params.file;
        })

        section.lastRead = subsection.lastRead = moment().startOf('minute').fromNow();
        
        $ionicScrollDelegate.scrollTop();
        $ionicScrollDelegate.resize();
      };



      $scope.setHistory = function(){

        localStorage.setItem('hist', JSON.stringify(contentOutline));
      }
    }])

app.controller('contentCtrl',function($scope, $state,$ionicScrollDelegate){
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

    return subsection.title;
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
    $ionicScrollDelegate.scrollTop();
    $state.go('content.sections', next)
    $ionicScrollDelegate.resize();
 
    // $uiViewScroll($(".content-wrapper"));
  }

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