
//A controller to handle the 'key knowledge', and 'life interests' assessments

app.controller('asmntInputCtrl', ['$scope', '$localstorage', 'workValueService', 'asmntResultService', '$ionicPopup', '$state', function($scope, $localstorage, workValueService, asmntResultService, $ionicPopup, $state){
	//function that will be called when a user is ready to rank their areas
	$scope.pushVals = function(){
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
  	});

	//user commit
	$scope.saveList = function(){
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
			asmntResultService.addAsmntResult(listItems, 'Key Knowledge Areas', datestring);
			$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
			$state.go('binder-asmntResults');
		}else{
			$ionicPopup.alert({
				title:'Uh-Oh!',
				template:'You must choose some work priorities that are <u>Absolutely Required</u>!'
			})
		}
  	}

}])


