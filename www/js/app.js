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

//MAIN CONTROLLER
app.controller('MainCtrl', ["$scope", "$state", "$ionicSideMenuDelegate", "$localstorage", "contactService", "$ionicPlatform", "$ionicPopup", "$ionicHistory", "$rootScope", "$ionicScrollDelegate", function($scope, $state, $ionicSideMenuDelegate, $localstorage, contactService, $ionicPlatform, $ionicPopup, $ionicHistory, $rootScope, $ionicScrollDelegate) {
  
  /* Get count of contacts for display */
  var load = $localstorage.getObject( 'contacts' );
	if (Object.keys(load).length !== 0) {
		contactService.loadList( load );
	}
  $scope.count = contactService.getContactsService().length;

  //disables verticle scrolling on the selected page
  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){ 
    
    if($state.current.name=='profile'){
      $ionicScrollDelegate.getScrollView().options.scrollingY = false;
    }else{
      $ionicScrollDelegate.getScrollView().options.scrollingY = true;         
    }
  })

  //Android hardware backbutton
  var deregister = $ionicPlatform.registerBackButtonAction(function(e) { 
    /*e.preventDefault();
    e.stopPropagation();*/
    if($state.current.name=="profile"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
  $scope.$on('$destroy', deregister);

  //always set pop to 0 after backbutton press
  $ionicPlatform.onHardwareBackButton(function(e){
    $rootScope.pop = 0;
  })

  //function to scroll top for each view
  $scope.setScreen = function(){
    $ionicScrollDelegate.scrollTop();
  }  
  
  //swiping navigation
  $scope.swipingLogicLeft = function(){
    console.log("swipe Left");

    if($ionicSideMenuDelegate.isOpen()) {
        $ionicSideMenuDelegate.toggleLeft();
        return;
    }

    if($state.is('content.sections')){
        $state.go('profile');
    }

    if($state.is('profile')){
      $state.go('binder');
    }

  }
  $scope.swipingLogicRight = function(){
    if($state.is('content.sections')){
      $ionicSideMenuDelegate.toggleLeft();
    }
    if($state.is('profile')){
      var last = $localstorage.getObject('lastSection');
      if(!last || !last.folder || !last.file){
        last = {
          folder:contentOutline[0].folder,
          file:contentOutline[0].sections[0].file
        }
      }
      $state.go('content.sections', last)  
    }
    if($state.is('binder')){
      $state.go('profile');
    }
    if($state.is('binder-ideas')||
      $state.is('binder-calendar') ||
      $state.is('binder-toDo') ||
      $state.is('binder-asmntResults') ||
      $state.is('binder-contacts') ||
      $state.is('binder-jobApps') ||
      $state.is('binder-individualAsmntResults')){
      console.log("includes")
       $state.go('binder');
    }
  }

}]);

app.controller('timelineCtrl', ['$scope', '$state', '$ionicScrollDelegate', '$localstorage', function($scope, $state, $ionicScrollDelegate, $localstorage){
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
        $localstorage.setObject('lastSection', params);
        $state.go('content.sections',params);
        $scope.setHistory();

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

app.controller('contentCtrl',function($scope, $state,$ionicScrollDelegate, $localstorage){
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
      isSubEnd = (subNum == subsectionLen);

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
    $localstorage.setObject('lastSection', next);
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

//filter which allows reverse layout of ng-repeat items
app.filter('reverse', function(){
  return function(items) {
    return items.slice().reverse();
  };
});
