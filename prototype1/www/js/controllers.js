var app = angular.module('starter.controllers', ['ionic'])

app.controller('MainCtrl', function($scope, $state) {
  $scope.toHome = function ( ) {
    $state.go( 'app.home' );
  };
  
  $scope.toTimeline = function ( ) {
    $state.go( 'app.timeline' );
  };
  
  $scope.toBinder = function ( ) {
    $state.go( 'app.binder' );
  };
  
  $scope.toBook = function ( ) {
    $state.go( 'app.book' );
  };
  
  $scope.toBinderToDoList = function ( ) {
    $state.go( 'app.binder-toDo' );
  };
  
  $scope.toBinderIdeas = function ( ) {
    $state.go( 'app.binder-ideas' );
  };
})

app.controller('HomeCtrl', function($scope, $location) {
  $scope.features = [
    { title: 'Timeline', id: 1 },
    { title: 'Career Binder', id: 2 },
    { title: 'Serious Job Seek Full Book', id: 3 },
    { title: 'Profile', id: 4 }
  ]

})

/* Idea list control */
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

/* To-Do-List control */
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

});