/* To-Do-List control */
app.controller('ToDoCtrl', ['$scope', '$ionicPopup', '$timeout', '$localstorage', 'toDoService', '$rootScope', function($scope, $ionicPopup, $timeout, $localstorage, toDoService, $rootScope) {
  
  /* Load from local storage */
  var load = $localstorage.getObject( 'toDoList' );
  if (Object.keys(load).length !== 0) {
    toDoService.loadList( load );
    $rootScope.totalTodos = toDoService.getNumberOf();
  }else{
  	$rootScope.totalTodos = 0;
  }

  //this variable will be used to keep track of ionic popups
  $rootScope.pop = 0;

  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    console.log($rootScope.pop);
    if($rootScope.pop){
      event.preventDefault(); 
    }
      // transitionTo() promise will be rejected
  })
  
  //Add to-do item
  $scope.addToDo = function() {
    //toDo object
	$scope.obj = {
	  title: '',
	  end: '',
	  done: false,
	  id: toDoService.getNumberOf()
	};

  	$rootScope.pop = 1;
    var myPopup = $ionicPopup.show({
      title: 'Enter your to-do item',
	  templateUrl: 'templates/binder/binder-toDo-popup.html',
      subTitle: 'Remember to be organized and keep track what you need to do',
      scope: $scope,
      buttons: [
      { text: 'Cancel',
      	onTap: function(e){
      		$rootScope.pop=0;
      	}
      },
      {
        text: '<b>Save</b>',
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
				$rootScope.pop=0;
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
  
  //Edit to-do
  $scope.editToDo = function(index) {
  	$rootScope.pop=1;
	var temp = toDoService.getItem(index);
	$scope.obj = {
		title: temp.title,
		end: temp.end,
		done: temp.done,
		id: temp.id
	};
    var myPopup = $ionicPopup.show({
      title: 'Edit your to-do item',
	  templateUrl: 'templates/binder/binder-toDo-popup.html',
      scope: $scope,
      buttons: [
      { text: 'Cancel',
      	onTap: function(e){
      		$rootScope.pop=0;
      	}
      },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
		onTap: function(e) {
	
		  /* Empty input alert */
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
				$rootScope.pop=0;
			    $scope.obj.end = d.toDateString();
				//var obj = { title: $scope.edit.title, date: $scope.obj.end, id: index };
				toDoService.editItem( $scope.obj, index );
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
 
 /* Remove all items marked as done */
 $scope.removeAll = function () {
	toDoService.removeAll();
	
 }
 
 /* When item is finished */
 $scope.finished = function(index) {
	$timeout(function() {
	toDoService.removeItem(index);
	$localstorage.setObject( 'toDoList', toDoService.output() );
	}, 1000);
 }
  
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
  
  function editItem( item, index ) {
	removeItem( index );
	list.splice(index,0,item);
  }
  
  function removeItem( index ) {
	list.splice(index, 1);
  }
  
  function removeAll() {
	var oldList = list;
    list = [];
    angular.forEach(oldList, function(item) {
      //add any non-done items to todo list
        if (!item.done) {
			list.push(item);
		}
    });
    //update local storage
    $localstorage.setObject('toDoList', list );
  
  }
  
  function getNumberOf() {
	return list.length;
  }
  
  function getItem( index ) {
	return list[index];
  }
  
  function getTitle( index ) {
	return list[index].title;
  }
  
  function output() {
	return list;
  }
  
  return {
    loadList: loadList,
	addToList: addToList,
	editItem: editItem,
	removeItem: removeItem,
	removeAll: removeAll,
	getNumberOf: getNumberOf,
	getItem: getItem,
	getTitle: getTitle,
	output: output
  };
}]); 