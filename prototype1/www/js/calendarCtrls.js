app.controller('CalendarCtrl', ['$scope', '$compile', '$ionicPopup', 'uiCalendarConfig', 'calendarService', 'toDoService', function CalendarCtrl($scope, $compile, $ionicPopup, uiCalendarConfig, calendarService, toDoService) {
	  var date = new Date();
	  //Event object
	  $scope.obj = {
		title: '',
		start: date,
		end: date

	  };
	  
	  //Add event popup
	  $scope.addEvent = function(){
		var myPopup = $ionicPopup.show({
		  title: 'Add an event',
		  templateUrl: 'templates/binder/binder-calendar-popup.html',
		  scope: $scope,
		  buttons: [
			{
			  text:'Cancel',
			  
			},
			{
			  text: 'Save',
			  //Add to calendar and to-do
			  onTap: function(e){
				var item = $scope.obj;
				calendarService.addToList(item);
				toDoService.addToList(item);
				$scope.obj = {
					title: '',
					start: date,
					end: date

			   };
			   
			   
			  }
			}
		  ]
		});
	  };

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
	
    /* remove event */
    $scope.remove = function(index) {
      calendarService.removeItem(index);
	  toDoService.removeItem(index);
    };
	
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
	
    /* Change View */
    $scope.renderCalender = function(calendar) {
	  if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
	
	$scope.render = function () {
		console.log("Hi");
	};

     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        $compile(element)($scope);
    };
	
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 500,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
		events: calendarService.output(),
		fixedWeekCount: false,
		eventLimit: true, 
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
	
	/* Output events */
	$scope.output = function () {
		$scope.events = calendarService.output().slice(0);
		return $scope.events;
	}
	
    /* event sources array*/
    $scope.eventSources = [];
}]);

app.factory('calendarService', function() {
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