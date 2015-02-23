//assessment result factory to store assessment results
app.factory('asmntResultService',  function(){
	//array to hold all asmnt results
	var asmntResults = [];

	function addAsmntResult(asmnt, title, date){
		asmntObj = {
			results: [],
			title: '',
			date: ''
		}

		asmntObj.results = asmnt;
		asmntObj.title = title;
		asmntObj.date = date;

		asmntResults.push(asmntObj);
	}

	function getAsmntResult(){
	/*asmntResults.foreach( function(item){

	});*/

		return asmntResults;
	}

	return {
		addAsmntResult: addAsmntResult,
		getAsmntResult: getAsmntResult,
	}

});


//assessment results controller
app.controller('asmntResultCtrl', ['$scope', 'asmntResultService', '$ionicPopup', '$localstorage', function($scope, asmntResultService, $ionicPopup, $localstorage){
	$scope.addResults = function(asmnt, title, date){
		//add asmnt result
		addAsmntResult(asmnt, title, date);
	}	

	$scope.getResults = function(){
		//get asmnt results from factory
		$scope.asmntResults = asmntResultService.getAsmntResult();
	}

	$scope.showResults = function(asmnt, index){
		//pass in array of assessment results for a particular assessment to scope variable
		$scope.resultObjects = asmnt.results;
		console.log($scope.resultObjects);
	}

}]);