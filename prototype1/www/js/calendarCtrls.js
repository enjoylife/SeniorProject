app.controller('CalendarCtrl', function ($scope, $cordovaCalendar) {
  
  
  $scope.getCalendar = function () {
	  
	  var nameCalendar = 'User Calendar';
	  
	  $cordovaCalendar.createCalendar({
		calendarName: nameCalendar,
		calendarColor: '#FF0000'
	  }).then(function (result) {
		// success
		console.log(result);
	  }, function (err) {
		// error
	  });
	  
	  $cordovaCalendar.createEventInteractively({
		title: 'Space Race',
		location: 'The Moon',
		notes: 'Bring sandwiches',
		startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
		endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
	  }).then(function (result) {
		// success
	  }, function (err) {
		// error
	  });
	  
	  

  };
  
  


});