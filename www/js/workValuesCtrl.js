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
		{
			head:'Flexibility: ',
			body:'A job that allows me to set my own schedule and change my working style as I wish.',
			value:null
		},
		{
			head:'Learning: ',
			body:'A job in which I can learn and enhance my skills and abilities.',
			value:null
		},
		{
			head:'Intensity: ',
			body:'A job that requires much time and attention, sustained effort and intense concentration.',
			value:null
		},
		{
			head:'Consistency: ',
			body:'A job in which my duties are clearly defined and my responsibilities are stable and predictable.',
			value:null
		},
		{
			head:'Independence: ',
			body:'A job in which I can do things my own way and make my own decisions.',
			value:null
		},
		{
			head:'Teamwork: ',
			body:'A job in which I can work closely with a number of other individuals.',
			value:null
		},
		{
			head:'Leadership: ',
			body:'A job in which I can lead, supervise and influence others.',
			value:null
		},
		{
			head:'Job Security: ',
			body:'A job that I know I will be able to keep as long as I want.',
			value:null
		},
		{
			head:'Stability: ',
			body:'A job with a solid, stable, established and predictable organization.',
			value:null
		},
		{
			head:'Financial Security: ',
			body:'A job that provides adequately for my needs, allowing me to live comfortably.',
			value:null
		},
		{
			head:'High Paying: ',
			body:'A job in which I can earn a good deal of money.',
			value:null
		},
		{
			head:'Financial Growth: ',
			body:'A job that allows for continuing salary growth and opportunity.',
			value:null
		},
		{
			head:'Career Growth: ',
			body:'A job that promises advancement, opportunity and increasing responsibility.',
			value:null
		},
		{
			head:'Prestige: ',
			body:'A job that is important and for which others might look up to me.',
			value:null
		},
		{
			head:'Support: ',
			body:'A job working for someone I admire and respect and to whose success I can contribute.',
			value:null
		},
		{
			head:'Respect: ',
			body:'A job in which my work is recognized and applauded and where I feel valued as a person.',
			value:null
		},
		{
			head:'Public Service: ',
			body:'A job in which allows me to make the world a better or safer place to live.',
			value:null
		},
		{
			head:'Helping People: ',
			body:'A job in which I can help people improve their lives.',
			value:null
		}
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


	//get values from factory for results page
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