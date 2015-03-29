app.controller('workValuesCtrl', ['$scope', '$localstorage', 'workValueService', 'asmntResultService', '$ionicPopup', '$state', function($scope, $localstorage, workValueService, asmntResultService, $ionicPopup, $state){
	//control for Work Values Assessment

	//array of work values as objects
	$scope.workObjects = [
		{
			head:'Creativity: ',
			body:'A job in which I can develop new products, ideas or processes, or in which I can express myself.',
			value:null
		},
		{
			head:'Challenge: ',
			body:'A demanding job which requires that I solve difficult problems.',
			value:null
		},
		{
			head:'Variety: ',
			body:'A job that allows me to perform many different tasks.',
			value:null
		},
	]


	//array which will hold all initial input values from our user
	var vals = [];

	//function to send all values into an array to pass to factory
	$scope.pushVals = function(){
		for(i = 0; i < $scope.workObjects.length; i++){
			if($scope.workObjects[i].value == 3){
				vals.push($scope.workObjects[i]);
			}
		}


		//send array to factory
		workValueService.setArray(vals);
		console.log(vals);
		vals = [];
	}

	$scope.getVals = function(){
		$scope.results = workValueService.getArray();
	}

	//sortable objects, thanks JQuery
	$(function() {
    	$( "#sortable" ).sortable();
    	$( "#sortable" ).disableSelection();
  	});

	$scope.getList = function(){
		var listItems = [];
	  	$("li").each(function(index) {
	  		console.log($(this).text());
	  		listItems.push($(this).text());
	  	})


	  	if(listItems.length > 0){
		  	//create date object
		  	d = new Date();
			curday = d.getDate();
			curmonth = d.getMonth();
			curyear = d.getFullYear();
			var datestring = curmonth + "/" + curday + "/" + curyear;
			
			//send results to asmnt results factory
			asmntResultService.addAsmntResult(listItems, 'Work Values & Priorities', datestring);
			$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
			$state.go('binder-asmntResults');
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must choose some work priorities that are <u>Absolutely Required</u>!'
			})
		}
  	}

}]);


//workValue factory
app.factory('workValueService', function(){
	var array = [];

	function setArray(arr){
		array = arr;
	}
	function getArray(){
		return array;
	}

	return{
		setArray: setArray,
		getArray: getArray,
	}

})