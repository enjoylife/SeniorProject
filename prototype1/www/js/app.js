// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('prototype', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
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
  

  //BINDER STATES
  .state('binder', {
      url: '/binder',
      templateUrl: '/templates/binder.html',
      controller: 'MainCtrl'
  })
	
  .state('binder-toDo', {
      url: '/binder/toDo',
      templateUrl: '/templates/binder-toDo.html',
      controller: 'MainCtrl'
  })
	
  .state('binder-ideas', {
      url: '/binder/ideas',
      templateUrl: '/templates/binder-ideas.html',
      controller: 'MainCtrl'
  })

  .state('binder-jobApps', {
      url: '/binder/jobApps',
      templateUrl: '/templates/binder-jobApps.html',
      controller: 'MainCtrl'  
  })
  

  //TIMELINE STATES
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

  $urlRouterProvider.otherwise('/MainMenu');
})


app.controller('MainCtrl', function($scope, $state) {
  $scope.toMainMenu = function(){
    $state.go('mainMenu');
  }
  
  $scope.toBinder = function ( ) {
    $state.go('binder');
  }
  
  $scope.toBinderToDoList = function ( ) {
    $state.go('binder-toDo');
  }
  
  $scope.toBinderIdeas = function ( ) {
    $state.go('binder-ideas');
  }

  $scope.toBinderJobs = function(){
    $state.go('binder-jobApps');
  }

  $scope.toTimeline = function(){
    $state.go('timeline');
  }

  $scope.toSelfAssess = function(){
    $state.go('selfAssess');
  }





//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            
      //MSI PARTIALS

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

/*/* Idea list control 
app.controller('IdeaCtrl', function($scope, $ionicActionSheet, $ionicPopup, $timeout) {
  var d = new Date();
  $scope.ideasList = [
    { title: 'Idea 1', date: d.toDateString(), id: 1 },
    { title: 'Idea 2', date: d.toDateString(), id: 2 },
    { title: 'Idea 3', date: d.toDateString(), id: 3 },
    { title: 'Idea 4', date: d.toDateString(), id: 4 }
  ];
  var count = $scope.ideasList.length;
  
// Triggered on a button click, or some other target
 $scope.modifyAction = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Edit' }
     ],
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
          
        },
     buttonClicked: function(index) {
       return true;
     }
   });
 };

   $scope.addIdea = function() {
    $scope.list = {}
	
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="list.idea">',
      title: 'Enter your ideas or inspirations',
      subTitle: 'Remember this could trigger motivation',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
		onTap: function(e) {
		  if (!$scope.list.idea) {
			var alertPopup = $ionicPopup.alert({
			  title: 'Input is empty',
			  template: 'Please input an item'
		    });
			alertPopup.then(function(res) {
			  alertPopup.close();
			});
		  } else {
		    var obj = { title: $scope.list.idea, date: d.toDateString(), id: count+1 };  
			$scope.ideasList.push(obj);
		  }
		}
      }
    ]
    });
	myPopup.then(function(res) {
		myPopup.close();
    });

  };

})

/* To-Do-List control 
app.controller('ToDoCtrl', function($scope, $ionicActionSheet, $ionicPopup, $timeout) {
  var d = new Date();
  $scope.toDoList = [
    { title: 'Finish personality skills assessment', date: d.toDateString(), id:1 },
    { title: 'Study for CSC 192', date: d.toDateString(), id:2 },
    { title: 'Finish up reading', date: d.toDateString() ,id:3 },
    { title: 'Research jobs', date: d.toDateString(), id:4 }
  ];
  var count = $scope.toDoList.length;

  $scope.addToDo = function() {
    $scope.list = {}
  
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="list.item">', 
      title: 'Enter your to-do item',
      subTitle: 'Remember to be organized and keep track what you need to do',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Next</b>',
        type: 'button-positive',
		onTap: function(e) {
		  if (!$scope.list.item) {
		    var alertPopup = $ionicPopup.alert({
			  title: 'Input is empty',
			  template: 'Please input an item'
		    });
			alertPopup.then(function(res) {
			  alertPopup.close();
			});
		  } else {
		    $scope.addToDoDate($scope.list.item);
		  }
		}
      }
    ]
    });
	
	myPopup.then(function(res) {
	  myPopup.close();
    });

  };
  
  $scope.addToDoDate = function( item ) {
    $scope.list = {}
  
    var myPopup = $ionicPopup.show({
      template: '<input type="date" ng-model="list.date">', 
      title: 'Enter the due date for your item',
      subTitle: 'Remember to be organized and keep track what you need to do',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
		onTap: function(e) {
		  var obj = { title: item, date: $scope.list.date.toDateString(), id: count+1 };  
		  $scope.toDoList.push(obj);
		  console.log( obj.id ); 
		}
      }
    ]
    });
	
	myPopup.then(function(res) {
      myPopup.close();
    });

  };

})*/

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