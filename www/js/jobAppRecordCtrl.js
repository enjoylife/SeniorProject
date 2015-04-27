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
app.controller('JobAppCtrl', ['$scope', '$ionicPopup', '$localstorage', 'jobAppService', '$rootScope', function($scope, $ionicPopup, $localstorage, jobAppService, $rootScope){
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
    $rootScope.totalApplications = jobAppService.getNumberOf();
  }else{
    $rootScope.totalApplications = 0;
  }

  //this variable will be used to keep track of ionic popups
  $rootScope.pop = 0;

  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    if($rootScope.pop){
      event.preventDefault(); 
    }
      // transitionTo() promise will be rejected
  })
  
  //open a popup window to be filled with job application data
  $scope.jobForm = function(){
    $rootScope.pop = 1;
    var newJob = $ionicPopup.show({
      title: 'New Job Application',
      templateUrl: 'templates/binder/binder-jobApps-popup.html',
      scope: $scope,
      buttons: [
        {
          text:'Cancel',
          onTap: function(e){
            $rootScope.pop = 0;
          }
        },
        {
          text: 'Submit',
          //type: '',
          onTap: function(e){
            //console.log("Hello");
            $scope.addRecord(e);

            //newJob.close();
          }
        }
      ]
    });
  };

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
    $rootScope.pop = 1;
    var editJob = $ionicPopup.show({
      title: 'Edit Job Application',
      templateUrl: 'templates/binder/binder-jobApps-popup.html',
      scope: $scope,
      buttons: [
        {
          text:'Cancel',
          onTap: function(e){
            $rootScope.pop = 0;
          }
        },
        {
          text: 'Update',
          //type: '',
          onTap: function(e){
            var d = chrono.parseDate($scope.obj.date);
			console.log(d);
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
        $rootScope.pop = 0;
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
			
			}
          }
        }
      ]
    })
  }


  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  //ADD RECORD FUNCTION
  $scope.addRecord = function(e){
  
  	var d = chrono.parseDate($scope.obj.date);
	console.log(d);
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
    $rootScope.pop = 0;
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
	}
    
  }

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

  function getNumberOf(){
    return array.length;
  }

  return{
	loadList: loadList,
    addJobApp: addJobApp,
    getJobApp: getJobApp,
    editJobApp: editJobApp,
	  removeJobApp: removeJobApp,
    getNumberOf: getNumberOf,
  }
});
