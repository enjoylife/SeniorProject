/* To-Do-List control */
app.controller('ToDoCtrl', ['$scope', '$ionicActionSheet', '$ionicPopup', '$timeout', 'toDoService', function($scope, $ionicActionSheet, $ionicPopup, $timeout, toDoService) {
  var count = toDoService.getNumberOf();

  //Add to-do item
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
  
  //Add to-do item due date
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
		  var obj = { title: item, date: $scope.list.date.toDateString(), id: count };  
		  toDoService.addToList(obj);
		  console.log( obj.id ); 
		}
      }
    ]
    });
	
	myPopup.then(function(res) {
      myPopup.close();
    });

  };
  
  $scope.list = [];
  
  $scope.output = function () {
	$scope.list = toDoService.output();
	return $scope.list;
  }

}])

app.factory('toDoService', function() {
  var list = [];
  
  function addToList(item) {
	list.push(item);
  }
  
  function getNumberOf() {
	return list.length;
  }
  
  function output() {
	return list;
  }
  
  return {
	addToList: addToList,
	getNumberOf: getNumberOf,
	output: output
  };
});