//**********************************************
//**********************************************
//**********************************************
//**********************************************
//  author: Adam Proulx
//**********************************************
//**********************************************
//**********************************************
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
// JOB APPLICATION CONTROLLER
app.controller('JobAppCtrl', ['$scope', '$ionicPopup', '$localstorage', 'jobAppService', function($scope, $ionicPopup, $localstorage, jobAppService){
  //var $scope.date;

  $scope.obj = {
    date: '',
    company: '',
    jobTitle: '',
    posDesc: '',
    notes: ''

  };
  
  /* Load from local storage */
  var load = $localstorage.getObject( 'jobRecords' );
  if (Object.keys(load).length !== 0) {
	jobAppService.loadList( load );
  }


  //JQuery for popups
  $("#jobButton").click(function(){
    $("#update").hide();
    $("#submit").show();
    $("#popup").fadeIn("slow");
  });

  $("#cancel").click(function(){
    $("#popup").fadeOut("slow");
  });

  $("#submit").click(function(){
    if($scope.addRecord()){
      $("#popup").fadeOut("fast"); 
      //update our scope after we've successfully added a new record
      $scope.$apply();
    }
  });


  //EDIT WINDOW
  //EDIT WINDOW
  //EDIT WINDOW
  //EDIT WINDOW
  //EDIT WINDOW
  $scope.editJobForm = function(tmp,index){
    var item = tmp;
    $scope.obj.date=item.date;
    $scope.obj.company=item.company;
    $scope.obj.jobTitle=item.jobTitle;
    $scope.obj.posDesc=item.posDesc;
    $scope.obj.notes=item.notes;

    //$scope.obj = item;
    $("#update").show();
    $("#submit").hide();
    $("#popup").fadeIn("slow");


    $("#update").click(function(){
      var d = chrono.parseDate($scope.obj.date);
      console.log(d);
      if (d === null) {
        //e.preventDefault();
        var alertPopup = $ionicPopup.alert({
        title: 'Date is not correct',
        template: 'Try using month/date/year'
      });
        alertPopup.then(function(res) {
        alertPopup.close();
      });
      } else {
        $scope.obj.date = d.toDateString();
        var editIndex = jobAppService.getJobApp().indexOf(tmp);
        console.log(editIndex);
        jobAppService.editJobApp(editIndex, $scope.obj);
        $localstorage.setObject( 'jobRecords', jobAppService.getJobApp() );

        $scope.obj = {
          date: '',
          company: '',
          jobTitle: '',
          posDesc: '',
          notes: ''
        }
        $("#popup").fadeOut("slow"); 
        $scope.$apply();

      }
    })
  }


  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  $scope.addRecord = function(){
  
  	var d = chrono.parseDate($scope.obj.date);
	console.log(d);
	if (d === null) {
		//e.preventDefault();
		var alertPopup = $ionicPopup.alert({
		title: 'Date is not correct',
		template: 'Try using month/date/year'
	});
		alertPopup.then(function(res) {
		alertPopup.close();
	});
	} else {
		$scope.obj.date = d.toDateString();
		$scope.jobAppRecord = [];
		var newJobApplication = $scope.obj;
		$scope.jobAppRecord.push(newJobApplication);

		//reset values to default after submit
		$scope.obj = {
		  date: '',
		  company: '',
		  jobTitle: '',
		  posDesc: '',
		  notes: ''
		};

		//push each attribute of $scope.obj to the factory
		$scope.jobAppRecord.forEach( function(arrayItem){
		  
		  jobAppService.addJobApp(arrayItem);
		  //alert('Array values added to jobApp factory');
		});
		
		$localstorage.setObject( 'jobRecords', jobAppService.getJobApp() );
    return true;
	}
    
  }//end addRecord()

	  // Remove Job App
	  $scope.removeJob = function(index) {
	   var confirmPopup = $ionicPopup.confirm({
		 title: 'Job Application Record',
		 template: 'Are you sure you want to delete this job application record?'
	   });
	   confirmPopup.then(function(res) {
		 if(res) {
		   jobAppService.removeJobApp( index );
		   $localstorage.setObject( 'jobRecords', jobAppService.getJobApp() );
		 } else {
		   
		 }
	   });
	 };

  //output array to place existing factory data
  $scope.output = [];

  //return factory data
  $scope.getJobs = function(){
    $scope.output = jobAppService.getJobApp();

    return $scope.output;
  }
}]);
//END JOB CONTROLLER


//JOB APP FACTORY
app.factory('jobAppService', function(){
  //an array to hold job records
  var array = [];

  function loadList(load) {
	array = load;
  }
  
  function addJobApp(jobApp){
    array.push(jobApp);
  }

  function getJobApp(){
    return array;
  }

  function editJobApp( index, item ){
    removeJobApp( index );
	array.splice( index, 0, item );
  }
  
  function removeJobApp( index ) {
	array.splice(index, 1);
  }

  return{
	loadList: loadList,
    addJobApp: addJobApp,
    getJobApp: getJobApp,
    editJobApp: editJobApp,
	removeJobApp: removeJobApp
  }
});
