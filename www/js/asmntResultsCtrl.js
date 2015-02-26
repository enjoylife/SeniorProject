//assessment result factory to store assessment results
app.factory('asmntResultService', [ '$localstorage', function($localstorage){
	//array to hold all asmnt results
	var asmntResults = [];


	function loadList(load){
		asmntResults = load;
	}

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
		loadList: loadList,
		addAsmntResult: addAsmntResult,
		getAsmntResult: getAsmntResult,
		
	}

}]);


//assessment results controller
app.controller('asmntResultCtrl', ['$scope', 'asmntResultService', '$ionicPopup', '$localstorage', function($scope, asmntResultService, $ionicPopup, $localstorage){
    /* Load from local storage */
    var load = $localstorage.getObject( 'assessments' );
    if (Object.keys(load).length !== 0) {
		asmntResultService.loadList( load );
    }	


	
	$scope.addResults = function(asmnt, title, date){
		//add asmnt result
		addAsmntResult(asmnt, title, date);
		//$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
	}	

	$scope.getResults = function(){
		//get asmnt results from factory
		$scope.asmntResults = asmntResultService.getAsmntResult();
	}

	$scope.showResults = function(asmnt, index){
		//pass in array of assessment results for a particular assessment to scope variable

		document.getElementById("showAsmnts").style.display = "none";
		document.getElementById("showAsmntResults").style.display = "block";
		$scope.header = asmnt.title + " taken " + asmnt.date;
		$scope.resultObjects = asmnt.results;

		console.log($scope.header);
		console.log($scope.resultObjects);

	}

	$scope.back = function(){
		document.getElementById("showAsmntResults").style.display = "none";
		document.getElementById("showAsmnts").style.display = "block";	
	}

}]);