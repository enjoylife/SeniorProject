/* To-Do-List control */
app.controller('ToDoCtrl', ['$scope', '$ionicActionSheet', '$ionicPopup', '$timeout', '$localstorage', 'toDoService', function($scope, $ionicActionSheet, $ionicPopup, $timeout, $localstorage, toDoService) {
  
  /* Load from local storage */
  var load = $localstorage.getObject( 'toDoList' );
  if (Object.keys(load).length !== 0) {
    toDoService.loadList( load );
  }
  
  //Add to-do item
  $scope.addToDo = function() {
    //toDo object
	$scope.obj = {
	  title: '',
	  end: '',
	  id: toDoService.getNumberOf()
	};
  
    var myPopup = $ionicPopup.show({
      title: 'Enter your to-do item',
	  templateUrl: 'templates/binder/binder-toDo-popup.html',
      subTitle: 'Remember to be organized and keep track what you need to do',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Next</b>',
        type: 'button-positive',
		onTap: function(e) {
		  if (!$scope.obj.title) {
			e.preventDefault();
		    var alertPopup = $ionicPopup.alert({
			  title: 'Input is empty',
			  template: 'Please input an item'
		    });
			alertPopup.then(function(res) {
			  alertPopup.close();
			});
		  } else {
		    console.log($scope.obj.end);
			var d = chrono.parseDate($scope.obj.end);
			console.log($scope.obj.end);
			if (d === null) {
				e.preventDefault();
				var alertPopup = $ionicPopup.alert({
				  title: 'Date is not correct',
				  template: 'Try using month/date/year'
				});
				alertPopup.then(function(res) {
				  alertPopup.close();
				});
			} else {
			    $scope.obj.end = d.toDateString();
				toDoService.addToList($scope.obj);
				$localstorage.setObject( 'toDoList', toDoService.output() );
			}
			$scope.obj = {
			  title: '',
			  date: '',
			  id: toDoService.getNumberOf()
			};
		  }
		}
      }
    ]
    });
	
	myPopup.then(function(res) {
	  myPopup.close();
    });

  };
  
    // Remove item
  $scope.removeItem = function(index) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'To-Do',
     template: 'Are you sure you want to delete this?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       toDoService.removeItem( index );
	   $localstorage.setObject( 'toDoList', toDoService.output() );
     } else {
       
     }
   });
 };
  
  $scope.output = function () {
	$scope.list = toDoService.output();
	return $scope.list;
  }

}])

app.factory('toDoService', ['$localstorage', function($localstorage) {
  var list = [];
  
  function loadList( load ) {
	list = load;
  }
  
  function addToList(item) {
	list.push(item);
  }
  
  function removeItem( index ) {
	list.splice(index, 1);
  }
  
  function getNumberOf() {
	return list.length;
  }
  
  function output() {
	return list;
  }
  
  return {
    loadList: loadList,
	addToList: addToList,
	removeItem: removeItem,
	getNumberOf: getNumberOf,
	output: output
  };
}]); 