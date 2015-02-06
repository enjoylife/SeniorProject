app.controller('CalendarCtrl', function ($scope, $cordovaCalendar) {
  
  
  $scope.getCalendar = function () {
	  
	  var nameCalendar = 'User Calendar';
	  
	  $cordovaCalendar.createCalendar({
		calendarName: nameCalendar,
		calendarColor: '#FF0000'
	  }).then(function (result) {
		// success
	  }, function (err) {
		// error
	  });
	  
	  alert(windows.plugins);
	  

  }
  
  


});