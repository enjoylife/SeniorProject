/* Idea list control */
app.controller('IdeaCtrl', ['$scope', '$ionicPopup', '$timeout', 'ideaService', function($scope, $ionicPopup, $timeout, ideaService) {
  var d = new Date();
  var count = ideaService.getNumberOf();

   //Add idea 
   $scope.addIdea = function() {
	console.log('test')
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
		
		  /* Empty input */
		  if (!$scope.list.idea) {
			e.preventDefault();
			var alertPopup = $ionicPopup.alert({
			  title: 'Input is empty',
			  template: 'Please input an item'
		    });
			alertPopup.then(function(res) {
			  alertPopup.close();
			});
		  } else {
		    var obj = { title: $scope.list.idea, date: d.toDateString(), id: count+1 };  
			ideaService.addToList(obj);
			$scope.list.idea = '';
		  }
		}
      }
    ]
    });


  };
  
  //Edit idea
  $scope.editIdea = function(index) {
	$scope.edit = {
		idea: ideaService.getTitle(index)
	};
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="edit.idea">',
      title: 'Change of idea? That is fine',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
		onTap: function(e) {
		
		  /* Empty input alert */
		  if (!$scope.edit.idea) {
			e.preventDefault();
			var alertPopup = $ionicPopup.alert({
			  title: 'Input is empty',
			  template: 'Please input an item'
		    });
			alertPopup.then(function(res) {
			  alertPopup.close();  
			});
		  } else {
			var newDate = new Date();
			var obj = { title: $scope.edit.idea, date: newDate.toDateString(), id: index };
			ideaService.editItem( obj, index );
		  }
		}
      }
    ]
    });
	myPopup.then(function(res) {
		myPopup.close();
    });

  };
  
  // Remove idea
  $scope.removeIdea = function(index) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Ideas/Inspirations',
     template: 'Are you sure you want to delete this awesome idea?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       ideaService.removeItem( index );
	   console.log( index );
     } else {
       
     }
   });
 };
  
  //Output the idea
  $scope.list = [];
  
  $scope.output = function () {
	$scope.list = ideaService.output();
	return $scope.list;
  }

}])

app.factory('ideaService', function() {
  var list = [];
  
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
  
  function getNumberOf() {
	return list.length;
  }
  
  function getTitle( index ) {
	return list[index].title;
  }
  
  function output() {
	return list;
  }
  
  return {
	addToList: addToList,
	editItem: editItem,
	removeItem: removeItem,
	getNumberOf: getNumberOf,
	getTitle: getTitle,
	output: output
  };
});