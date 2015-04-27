
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
		
		/* Get only High Priority Goals */
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
				template:'You must have at least 1 High Priority goal'
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
	
	// Save Goal Setting Assessment
	$scope.saveGoals = function(assessment){
		var listItems = [];
		var check = true;
		for (i = 0; i < $scope.results.length; i++) {
			var goals = {
				'goal': '',
				'steps': [],
				'times': []
			};
			goals.goal = $scope.results[i];
			for (j = 1; j <= 5; j++) {
				var step = document.getElementById('g'+i+'_step'+j).value;
				var time = document.getElementById('g'+i+'_time'+j).value;
				
				/* Validation Checking to make sure each step and time are associated with each other */
				if( (step !== "" && time == "") ){
					i = $scope.results.length;
					j = 6;
					check = false;
					$ionicPopup.alert({
						title:'Uh-Oh!',
						template:'Please add a time to your step'
					})
				} else if ( (step == "" && time !== "") ){
					i = $scope.results.length;
					j = 6;
					check = false;
					$ionicPopup.alert({
						title:'Uh-Oh!',
						template:'Please add a step to your time'
					})
				}
				
				/* Push into array if not empty */
				if ( step !== "" ){
					goals.steps.push(step);
				}
				if ( time !== "" ) {
					goals.times.push(time);
				}
				
				if(j == 5) {
				
					/* Validation checking to make sure at least 1 step for each goal */
					if ( (goals.steps.length > 0) && (goals.times.length > 0) ) {
						listItems.push(goals);
					} else {
						i = $scope.results.length;
						$ionicPopup.alert({
							title:'Uh-Oh!',
							template:'Please add steps and time to all of your goals'
						})
					}
				}
			}
		}
		console.log(listItems);
		console.log(listItems.length);

	  	if(listItems.length == $scope.results.length ){
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
		} 
  	}
	
	// Save assessment Life & Work Environment
	$scope.saveLifeWork = function(assessment){
		var listItems = [];
		var obj = {
				'location_yes': [],
				'location_no': [],
				'people_yes': [],
				'people_no': [],
				'work_yes': [],
				'work_no': []
		};
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 5; j++) {
				if (i == 1) {
					var yes = document.getElementById('location_yes'+j).value;
					var no = document.getElementById('location_no'+j).value;
					if(yes !== ""){
						obj.location_yes.push(yes);
					}
					if(no !== ""){
						obj.location_no.push(no);
					}
				} else if ( i == 2) {
					var yes = document.getElementById('people_yes'+j).value;
					var no = document.getElementById('people_no'+j).value;
					if(yes !== ""){
						obj.people_yes.push(yes);
					}
					if(no !== ""){
						obj.people_no.push(no);
					}
				} else if ( i == 3) {
					var yes = document.getElementById('work_yes'+j).value;
					var no = document.getElementById('work_no'+j).value;
					if(yes !== ""){
						obj.work_yes.push(yes);
					}
					if(no !== ""){
						obj.work_no.push(no);
					}
				}
				
			}
		}
		
		/* Validation check for at least one input */
		if (obj.location_yes.length > 0 || obj.location_no.length > 0 ||
			obj.people_yes.length > 0 || obj.people_no.length > 0 ||
			obj.work_yes.length > 0 || obj.work_no.length > 0) {
			
			listItems.push(obj);
		}

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
				template:'You must input at least one value'
			})
		}
  	}

}])


