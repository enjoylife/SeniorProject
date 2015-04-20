
//A controller to handle the 'key knowledge', and 'life interests' assessments

app.controller('asmntInputCtrl', ['$scope', '$localstorage', 'workValueService', 'asmntResultService', '$ionicPopup', '$state', function($scope, $localstorage, workValueService, asmntResultService, $ionicPopup, $state){
	//function that will be called when a user is ready to rank their areas
	$scope.pushVals = function(goToStateName){
		var inventory = [];

		//grab the non-empty text boxes and put them in our array
		$("input").each(function(index) {
			if($(this).val() !== ""){
	  			console.log($(this).val());
	  			inventory.push($(this).val());
	  		}
	  	})

		//send our array to our factory
		if(inventory.length > 0){
	  		workValueService.setArray(inventory);
			console.log(inventory);
			inventory = [];
			$state.go(goToStateName);
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must input at least one value.'
			})
		}
	}
	
	//function that will be called when a user is finish ranking their goals
	$scope.pushGoalsHigh = function(goToStateName){
		var inventory = [];
		
		$("#sortableGoalsHigh li").each(function(index){
			inventory.push($(this).text());
		})
		

		//send our array to our factory
		if(inventory.length > 0){
	  		workValueService.setArray(inventory);
			console.log(inventory);
			inventory = [];
			$state.go(goToStateName);
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must have at least one value'
			})
		}
	}

	//function to add text box input if user would 
	//like to enter more values
	//takes in the id of the <div> area as an arg
	$scope.addTextInput = function(id){
		var addText = "<input type='text' style='border:1px solid black;'><br>";
		$(id).append(addText);
	}

	//return our results from the factory and place them in a $scope variable
	$scope.getVals = function(){
		$scope.results = workValueService.getArray();
	}



	//sortable objects, thanks JQuery
	$(function() {
		$( "#sortable" ).sortable();
    	$( "#sortable" ).disableSelection();
		$( "#sortableGoals" ).sortable({
			connectWith: ".connectedSortable"
		});
		$( "#sortableGoalsHigh, #sortableGoalsMed, #sortableGoalsLow" ).sortable({
			connectWith: ".connectedSortable",
			receive: function(event, ui) {

				if ($(this).children().length > 3) {

					$(ui.sender).sortable('cancel');
				}
			}
		});
		$( "#sortableGoals, #sortableGoalsHigh, #sortableGoalsMed, #sortableGoalsLow" ).disableSelection();
		
  	});

	//user commit
	$scope.saveList = function(assessment){
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
			asmntResultService.addAsmntResult(listItems, assessment, datestring);
			$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
			listItems = [];
			workValueService.setArray(listItems);
			$state.go('binder-asmntResults');
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must choose at least one value.'
			})
		}
  	}
	
	$scope.saveGoals = function(assessment){
		var listItems = [];
		for (i = 1; i <= 3; i++) {
			var goals = {
				'goal': '',
				'steps': [],
				'times': []
			};
			goals.goal = $scope.results[i-1];
			for (j = 1; j <= 5; j++) {
				var step = document.getElementById('g'+i+'_step'+j).value;
				var time = document.getElementById('g'+i+'_time'+j).value;
				if(step !== ""){
					goals.steps.push(step);
				}
				if(time !== ""){
					goals.times.push(time);
				}
				if(j == 5) {
					console.log(goals.goal);
					console.log(goals.steps);
					console.log(goals.times);
					console.log(goals);
					listItems.push(goals);
				}
			}
		}
		console.log(listItems);
		console.log(listItems.length);

	  	if(listItems.length > 0){
		  	//create date object
		  	d = new Date();
			curday = d.getDate();
			curmonth = d.getMonth();
			curyear = d.getFullYear();
			var datestring = curmonth + "/" + curday + "/" + curyear;
			
			//send results to asmnt results factory
			asmntResultService.addAsmntResult(listItems, assessment, datestring);
			$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
			listItems = [];
			workValueService.setArray(listItems);
			$state.go('binder-asmntResults');
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must choose at least one value.'
			})
		}
  	}

}])


