app.controller('workValuesCtrl', ['$scope', 'workValueService', function($scope, workValueService){
	//control for Work Values Assessment, contains values for buttons, and questions
	//contained as properties of an object

	//qualities of which to judge one's self.
	//wq1h = work quality one head
	//wq1b = work quality one body, etc
	$scope.workQualities = {
		wq1h: 'Creativity: ',
		wq1b: 'A job in which I can develop new products, ideas or processes, or in which I can express myself.',

		wq2h:'Challenge: ',
		wq2b:'A demanding job which requires that I solve difficult problems.',

		wq3h:'Variety: ',
		wq3b:'A job that allows me to perform many different tasks.',
	}
	

	//object to contain all necessary placeholders
	$scope.data = {
		workQualityOne: null,
		workQualityTwo: null,
		workQualityThree: null,
	}

	$scope.output = function(){
		console.log($scope.data.workQualityOne);
	}

	//array which will hold all initial input values from our user
	var vals = [];

	//function to send all values into an array to pass to factory
	$scope.pushVals = function(){
		for(var v in $scope.data){
			/*console.log(v);
			console.log($scope.data[v]);*/
			if($scope.data[v] == 3){
				vals.push($scope.data[v]);
			}
		}

		//send array to factory
		workValueService.setArray(vals);
		console.log(vals);
		//vals = [];
	}

	$scope.getVals = function(){
		$scope.results = workValueService.getArray();
		//return $scope.results;
	}

	$(function() {
    	$( "#sortable" ).sortable();
    	$( "#sortable" ).disableSelection();
  	});

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