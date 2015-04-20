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

	function deleteAsmnt(index){
		asmntResults.splice(index, 1);
	}

	return {
		loadList: loadList,
		addAsmntResult: addAsmntResult,
		getAsmntResult: getAsmntResult,
		deleteAsmnt: deleteAsmnt,
	}

}]);


//assessment results controller
app.controller('asmntResultCtrl', ['$scope', 'asmntResultService', '$ionicPopup', '$localstorage', '$ionicScrollDelegate', '$state', '$ionicScrollDelegate', '$rootScope', function($scope, asmntResultService, $ionicPopup, $localstorage, $ionicScrollDelegate, $state, $ionicScrollDelegate, $rootScope){

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
		if(asmntResultService.getAsmntResult() == 0){
			$("#nullMessage").show();
			return asmntResultService.getAsmntResult();
		}else{
			$("#nullMessage").hide();
			return asmntResultService.getAsmntResult();
		}

		/*$scope.asmntResults = asmntResultService.getAsmntResult();

		//if no results, display null message
		if($scope.asmntResults.length == 0){
			$("#nullMessage").show();
		}else{
			
		}*/

	}

	//showResults will check the asmnt.title and show display the corresponding assessment
	//accordingly
	$scope.showResults = function(asmnt, index){
		if(asmnt.title === 'MSI Results'){
			//document.getElementById("showAsmnts").style.display = "none";
			//document.getElementById("showAsmntResults").style.display = "block";
			$scope.toggle("showAsmnts", "showAsmntResults");
			$scope.header = asmnt.title + " taken " + asmnt.date;
			//pass in array of assessment results for a particular assessment to scope variable
			$scope.resultObjects = asmnt.results;

			console.log($scope.header);
			console.log($scope.resultObjects);
		}

		if(asmnt.title === 'Career Personality Results'){
		
			$scope.toggle("showAsmnts", "showPersonalityResults");
			$scope.header = asmnt.title + " taken " + asmnt.date;
			$scope.resultObjects = asmnt.results;
			console.log($scope.resultObjects);

		}

		if(asmnt.title === 'Work Values & Priorities'){
			$scope.toggle("showAsmnts", "showWorkValueResults");
			$scope.resultObjects = asmnt.results;
		}

		if(asmnt.title === 'Key Knowledge Areas'){
			$scope.toggle("showAsmnts", "showKeyKnowledgeResults");
			$scope.resultObjects = asmnt.results;
		}

		if(asmnt.title === 'Life Interests & Passions'){
			$scope.toggle("showAsmnts", "showLifeInterestsResults");
			$scope.resultObjects = asmnt.results;
		}
		
		if(asmnt.title === 'Goal Setting'){
			$scope.toggle("showAsmnts", "showGoalResults");
			$scope.resultObjects = asmnt.results;
			console.log($scope.resultObjects);
		}

	}

	//toggles between assessment headers and their individual results
	$scope.toggle = function(one, two){
		document.getElementById(one).style.display = "none";
		document.getElementById(two).style.display = "block";	
		$scope.setScreen();
	}


	$scope.delete = function(index){
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Are you sure you want to delete this result?',
	   });
	   confirmPopup.then(function(res) {
		 if(res) {
		   asmntResultService.deleteAsmnt( index );
		   $localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
		   //$scope.getResults();
		 } else {
		   
		 }
	   });

	}

	//function to show assessment list using jQuery slideUp()
	$("#showMenu").click(function(){
		$("#asmntMenu").slideToggle();
	});

	//code to change color of the links on click/tap
	$("#asmntMenu span").click(function(){
		$(this).css({"color":"#00CCFF"});
	});

/*	$scope.viewHolland = function(){
		console.log("viewHolland()");
		$rootScope.holland = true;
		$state.go('content.sections', {'folder':'assessment', 'file':'personality.html'});
	}*/

}]);