app.controller('CalendarCtrl', ['$scope', '$compile', '$ionicPopup', '$cordovaCalendar', '$localstorage', 'uiCalendarConfig', 'calendarService', 'toDoService', function CalendarCtrl($scope, $compile, $ionicPopup, $cordovaCalendar, $localstorage, uiCalendarConfig, calendarService, toDoService) {
	  //Global variables to be updated
	  var date = new Date();
	  var year = date.getFullYear();
	  var month = date.getMonth();
	  var day = date.getDate();
	  var startHour = 0;
	  var startMin = 0;
	  var endHour = 0;
	  var endMin = 0;
	  
	  //Event object
	  $scope.obj = {
		title: '',
		start: '',
		end: ''

	  };
	  
	  //Save time
	  $scope.event = {
		timeStart: new Date(),
		timeEnd: new Date()
	  }
		
	  //Used for hiding buttons
	  $scope.isDay = false;
	  
	  /* Load from local storage */
	  var load = $localstorage.getObject( 'calendar' );
	  if (Object.keys(load).length !== 0) {
		calendarService.loadList( load );
	  }
	  
	  $scope.changeStart = function () {
		console.log($scope.event.timeStart);
	  };
	  
	  $scope.changeEnd = function () {
		console.log($scope.event.timeEnd);
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
			  onTap: function(e){
				//Get start date
				//startTime = chrono.parseDate($scope.obj.start);
				startHour = $scope.event.timeStart.getHours();
				startMin = $scope.event.timeStart.getMinutes();
				//var startDate = moment({ y: year, M: month, d: day, h: startHour, m: startMin, s: 0, ms:0 });
				var startDate = new Date( year, month, day, startHour, startMin, 0 , 0 );
				$scope.obj.start = startDate;
				
				//Get end date
				//endTime = chrono.parseDate($scope.obj.end);
				endHour = $scope.event.timeEnd.getHours();
				endMin = $scope.event.timeEnd.getMinutes();
				//var endDate = moment({ y: year, M: month, d: day, h: endHour, m: endMin, s: 0, ms:0 });
				var endDate = new Date( year, month, day, endHour, endMin, 0, 0 )
				$scope.obj.end = endDate;
				
				if ( $scope.obj.start === null || $scope.obj.end === null) {
					e.preventDefault();
					var alertPopup = $ionicPopup.alert({
					  title: 'Time is not correct',
					  template: 'Try using numbers and a.m. or p.m.'
					});
					alertPopup.then(function(res) {
					  alertPopup.close();
					});
				} else {
					console.log($scope.obj.start);
					console.log($scope.obj.end);
					var toDo = {
					  title: $scope.obj.title,
					  end: ($scope.obj.end).toDateString()
					};
					//Add to calendar and to-do
					calendarService.addToList($scope.obj);
					toDoService.addToList(toDo);
					$localstorage.setObject( 'calendar', calendarService.output() );
					$localstorage.setObject( 'toDoList', toDoService.output() );
					
					//Save to native calendar app
					$cordovaCalendar.createEvent({
						title: $scope.obj.title,
						startDate: $scope.obj.start,
						endDate: $scope.obj.end
					}).then(function (result) {
						// success
						console.log(result);
					}, function (err) {
						// error
                        console.log(err);
					});
				}
				
				$scope.isDay = false;
					
					//Reset object
					$scope.obj = {
						title: '',
						start: '',
						end: ''

				   };   
				   
				   $scope.event = {
						timeStart: new Date(),
						timeEnd: new Date()
				   }
			   			   
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
	  $localstorage.setObject( 'calendar', calendarService.output() );
	  $localstorage.setObject( 'toDoList', toDoService.output() );
    };
	
    /* Change View */
    $scope.changeView = function(view,calendar) {
	  if (view == 'agendaDay')
	  {
		$scope.isDay = true;
		uiCalendarConfig.calendars['myCalendar1'].fullCalendar('option','contentHeight', 1050);
		uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
	  }else{
		$scope.isDay = false;
		uiCalendarConfig.calendars['myCalendar1'].fullCalendar('option','contentHeight', 'auto');
		uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
	  }
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
		$(element).selectable();
        $compile(element)($scope);
    };
	
	$scope.dayClick = function( date, allDay, jsEvent, view){
          $scope.alertMessage = ('Day Clicked ' + date.format());
		  $scope.changeView('agendaDay', 'myCalendar1');
		  uiCalendarConfig.calendars['myCalendar1'].fullCalendar('gotoDate',date);
    };
	
	$scope.dayRender = function( date, cell) {
		cell.selectable();

	};
	
	$scope.select = function( start, end, jsEvent, view ) {
		$scope.isDay = true;
		date = end.toDate();
		console.log(date);
		year = date.getFullYear();
		month = date.getMonth();
		day = date.getDate();
		console.log(day);
		$scope.changeView('agendaDay', 'myCalendar1');
		uiCalendarConfig.calendars['myCalendar1'].fullCalendar('gotoDate',start);

	};
	
    /* config object */
    $scope.uiConfig = {
      calendar:{
		height: $(window).height()-100,
		theme: true,
		themeButtonIcons: false,
        editable: true,
		timezone: 'local',
		ignoreTimezone: false,
		scrollTime: '00:00:00',       
		allDaySlot: false,
        header:{
          left: 'title',
          center: '',
          right: 'today, prev,next'
        },
		views: {
			day: { // name of view
				// other view-specific options here
			}
		},
		events: calendarService.output(),
		eventColor: 'rgb(35,128,99)',
		fixedWeekCount: false,
		eventLimit: true,
		selectable: true,
		select: $scope.select,
		dayRender: $scope.dayRender,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
	
	/* Output events */
	$scope.output = function () {
		return calendarService.output();
	}
	
    /* event sources array*/
    $scope.eventSources = [];
	    
}]);

app.factory('calendarService', ['$localstorage', function($localstorage) {
  var list = [];
  
  function loadList(load) {
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
    loadList: loadList,
	addToList: addToList,
	editItem: editItem,
	removeItem: removeItem,
	getNumberOf: getNumberOf,
	getTitle: getTitle,
	output: output
  };
}]);