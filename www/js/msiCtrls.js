//THIS FILE HOLDS THE CONTROLLERS FOR EACH SECTION OF QUESTIONS
//IN THE MOTIVATED SKILLS ASSESSMENT AND THE SCRAPER FACTORY

//service to collect user input values from surveys
app.factory('scraper', function() {
  //blank array to hold all values
  var values = [];

  function loadlist(load){
	values = load;
  }  

  function addTotal(val){
    values.push(val);
  }

  //this loop will return the totals that are 6 or higher.
  function output(){
    var out = [];

    values.forEach( function(object){
      if(object.sum >= 6){
        out.push(object);
      }
    });
    //values = [];
    return out;
  }

  function resetVals(){
  	values = [];
  }

  function GetMaxVal(){
    return Math.max.apply(Math, values);
  }

  return {
  	loadlist: loadlist,
    addTotal: addTotal,
    GetMaxVal: GetMaxVal,
    output: output,
    resetVals: resetVals
  };

});



//Communication controller
app.controller('comsCtrl', ['$scope', 'scraper', '$ionicScrollDelegate', 'asmntResultService', "$localstorage", function($scope, scraper, $ionicScrollDelegate, asmntResultService, $localstorage){
	//array to hold result values
	//$scope.results = [];	

	$scope.setScreen = function(){
		$ionicScrollDelegate.scrollTop();
	}

	//Place the questions into a scope object and separates them into attributes of header and body
	$scope.comQuestions = {
		writingHead: "Writing: ",
		writingBody: " Possess good to excellent skills. Able to create business or technical documents, correspondence, and other effective written communications. Enjoy creative writing.",
		speakingHead: "Speaking: ",
		speakingBody: " Comfortable speaking in meetings and communicating complex information in an easily understandable form to individuals at various levels.",
		presentationHead: "Presentation: ",
		presentationBody: " Skilled at giving presentations to large or small groups. Able to develop effective visual aids for presentations.",
		persuasiveHead: "Persuasive: ",
		persuasiveBody: " Comfortable using persuasive skills to convince others as to a particular course of action.",
		saleHead: "Selling: ",
		saleBody: " Skilled at convincing others to buy a product or service.",
		dramaHead: "Dramatics: ",
		dramaBody: " Enjoy delivering information, ideas or stories dramatically.",
		negotiatingHead: "Negotiating: ",
		negotiatingBody: " Capable of bargaining with others to reach a desired agreement."

	}

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];

	//contains necessary placeholders
	$scope.data = { 
		//array to hold all totals
		comsTotals: [],

		//values to store user input
		writingSVal: 0, 
		writingMVal: 0,
		speakingSVal: 0,
		speakingMVal: 0,
		presentationSVal: 0,
		presentationMVal: 0,
		persuasiveSVal: 0,
		persuasiveMVal: 0,
		saleSVal: 0,
		saleMVal: 0,
		dramaSVal: 0,
		dramaMVal: 0,
		negotiatingSVal: 0,
		negotiatingMVal: 0,
	};

	//the function that will be called to carry over questions and sum values
	$scope.total = function(head, body, s, m){
			t= {
				h: head,
				b: body,
				sum: s+m
			}
			$scope.data.comsTotals.push(t);
	}


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		$scope.total($scope.comQuestions.writingHead, $scope.comQuestions.writingBody, $scope.data.writingSVal, $scope.data.writingMVal);
		$scope.total($scope.comQuestions.speakingHead, $scope.comQuestions.speakingBody, $scope.data.speakingSVal, $scope.data.speakingMVal);
		$scope.total($scope.comQuestions.presentationHead, $scope.comQuestions.presentationBody, $scope.data.presentationSVal, $scope.data.presentationMVal);
		$scope.total($scope.comQuestions.persuasiveHead, $scope.comQuestions.persuasiveBody, $scope.data.persuasiveSVal, $scope.data.persuasiveMVal);
		$scope.total($scope.comQuestions.saleHead, $scope.comQuestions.saleBody, $scope.data.saleSVal, $scope.data.saleMVal);
		$scope.total($scope.comQuestions.dramaHead, $scope.comQuestions.dramaBody, $scope.data.dramaSVal, $scope.data.dramaMVal);
		$scope.total($scope.comQuestions.negotiatingHead, $scope.comQuestions.negotiatingBody, $scope.data.negotiatingSVal, $scope.data.negotiatingMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.comsTotals.forEach( function(arrayItem){
			console.log("inside forEach");
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.comsTotals = [];

	}



	$scope.reset = function(){
		console.log("inside reset() results = " + $scope.results);
		scraper.resetVals();
		$scope.results = [];
		console.log("After reset() results = " + $scope.results);
	}

	$scope.getResults = function(){
		//alert($scope.results);
		$scope.results = scraper.output().sort(function(a, b){ return b.sum-a.sum });
		//$scope.results.sort(function(a, b){ return(b-a) });
		console.log("getResults() results = " + $scope.results);
		$ionicScrollDelegate.scrollTop();

		d = new Date();
		curday = d.getDate();
		curmonth = d.getMonth();
		curyear = d.getFullYear();
		var datestring = curmonth + "/" + curday + "/" + curyear;
		
		//send results to asmnt results factory
		asmntResultService.addAsmntResult($scope.results, 'MSI Results', datestring);
		$localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );
	}		


	$scope.maximumval = function(){
		return scraper.GetMaxVal();
	}

}]);

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Marketing Controller
//			Marketing Controller
//			Marketing Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('marketCtrl', ['$scope', 'scraper', function($scope, scraper){
	//Place the questions into a scope object and separates them into attributes of head and body
	$scope.marketQuestions = {
		socialHead: "Social Ease: ",
		socialBody: " Effective in social situations; comfortable meeting new people and establish rapport easily.",
		PRHead: "Public Relations: ",
		PRBody: " Interact effectively on a continual basis with customers requiring information, service or help.",
		custservHead: "Customer/User Service: ",
		custservBody: " Skilled at listening carefully to customer needs and complaints. Able to identify, trouble shoot and resolve problems to customer 's satisfaction. Skilled at defusing customer anger or frustration; able to create a positive experience for the customer.",
		marketsalesHead: "Marketing & Sales: ",
		marketsalesBody: " Skilled at identifying customer needs and preferences and making appropriate product or service recommendations.",
		profHead: "Professional Image: ",
		profBody: " Able to present a good professional appearance. Able to represent an organization effectively in a positive light. Enjoy dressing appropriately for professional situations. Project a solid professional image.",
		improvementHead: "Performance Improvement: ",
		improvementBody: " Able to deal effectively with objective criticism or feedback and improve performance. Able to identify areas of deficiency to improve performance. Able to defuse problems and resolve complaints with positive action."
	}


	//radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];



	//holds all user input values
	$scope.data = { 
		marketTotals: [],

		socialSVal: 0, 
		socialMVal: 0,
		PRSVal: 0, 
		PRMVal: 0,
		custservSVal: 0, 
		custservMVal: 0,
		marketsalesSVal: 0, 
		marketsalesMVal: 0,
		profSVal: 0, 
		profMVal: 0,
		improvementSVal: 0, 
		improvementMVal: 0,

	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.marketTotals.push(t);
	}



	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.marketQuestions.socialHead, $scope.marketQuestions.socialBody, $scope.data.socialSVal, $scope.data.socialMVal);
		$scope.total($scope.marketQuestions.PRHead, $scope.marketQuestions.PRBody, $scope.data.PRSVal, $scope.data.PRMVal);
		$scope.total($scope.marketQuestions.custservBody, $scope.marketQuestions.custservHead, $scope.data.custservSVal, $scope.data.custservMVal);
		$scope.total($scope.marketQuestions.marketsalesHead, $scope.marketQuestions.marketsalesBody, $scope.data.marketsalesSVal, $scope.data.marketsalesMVal);
		$scope.total($scope.marketQuestions.profHead, $scope.marketQuestions.profBody, $scope.data.profSVal, $scope.data.profMVal);
		$scope.total($scope.marketQuestions.improvementHead, $scope.marketQuestions.improvementBody, $scope.data.improvementSVal, $scope.data.improvementMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.marketTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.marketTotals = [];
	}

}]);


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Quantitative Analysis Controller
//			Quantitative Analysis Controller
//			Quantitative Analysis Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('qaCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.qaQuestions = {
		compspeedHead: "Computational Speed: ",
		compspeedBody: " Able to process, compute or manipulate numerical data rapidly and accurately with or without the aid of a calculator or computing device.",
		numcrunchHead: "Work With Numerical Data: ",
		numcrunchBody: " Skilled at dealing with and manipulating large amounts of quantitative data. Able to compile, interpret, and present complex data.",
		probsolvHead: "Solve Quantitative Problems: ",
		probsolvBody: " Able to analyze numerical data using complex equations and methods to arrive at a satisfactory solution. Able to recommend course of action based on quantitative analysis.",
		computerHead: "Computer Skills: ",
		computerBody: " Able to analyze customer hardware or software needs or problems. Skilled at writing software specifications and developing computer software programs or software systems in order to automate processes for maximum efficiency and data collection. Able to identify hardware solutions based on careful analysis."
	};

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];


	//
	$scope.qaTotals = [];

	//the object which contains most of the important chunks of data
	$scope.data = { 
		qaTotals: [],

		compspeedSVal: 0, 
		compspeedMVal: 0,
		numcrunchSVal: 0, 
		numcrunchMVal: 0,
		probsolvSVal: 0, 
		probsolvMVal: 0,
		computerSVal: 0, 
		computerMVal: 0,
	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.qaTotals.push(t);
	}


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.qaQuestions.compspeedHead, $scope.qaQuestions.compspeedBody, $scope.data.compspeedSVal, $scope.data.compspeedMVal);
		$scope.total($scope.qaQuestions.numcrunchHead, $scope.qaQuestions.numcrunchBody, $scope.data.numcrunchSVal, $scope.data.numcrunchMVal);
		$scope.total($scope.qaQuestions.Head, $scope.qaQuestions.probsolvBody, $scope.data.probsolvSVal, $scope.data.probsolvMVal);
		$scope.total($scope.qaQuestions.computerHead, $scope.qaQuestions.computerBody, $scope.data.computerSVal, $scope.data.computerMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.qaTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.qaTotals = [];
	};

}]);


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Analytics Controller
//			Analytics Controller
//			Analytics Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('analyticsCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.analyticsQuestions = {
		scienceHead: "Scientific Curiosity: ",
		scienceBody: "  Significant interest in scientific phenomena. Motivated to explore, research, pursue and develop new technologies and innovations.",
		researchHead: "Research: ",
		researchBody: "  Able to gather information, in a systematic way, for a particular field of knowledge, verifying facts or principles.",
		techworkHead: "Technical Work: ",
		techworkBody: "  Able to understand and use engineering, or industrial principles, tools and equipment to improve processes, services or products.",		
	};


	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];


	$scope.analyticsTotals = [];


	//the object which contains most of the important chunks of data
	$scope.data = { 
		analyticsTotals: [],

		scienceSVal: 0, 
		scienceMVal: 0,
		researchSVal: 0, 
		researchMVal: 0,
		techworkSVal: 0, 
		techworkMVal: 0,
	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.analyticsTotals.push(t);
	}


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.analyticsQuestions.scienceHead, $scope.analyticsQuestions.scienceBody, $scope.data.scienceSVal, $scope.data.scienceMVal);
		$scope.total($scope.analyticsQuestions.researchHead, $scope.analyticsQuestions.researchBody, $scope.data.researchSVal, $scope.data.researchMVal);
		$scope.total($scope.analyticsQuestions.techworkHead, $scope.analyticsQuestions.techworkBody,  $scope.data.techworkSVal, $scope.data.techworkMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.analyticsTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.analyticsTotals = [];
	};


}]);





//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Technical Reasoning Controller
//			Technical Reasoning Controller
//			Technical Reasoning Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('techReasonCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.techReasonQuestions = {
		mechanicalHead: "Mechanical Reasoning: ",
		mechanicalBody: " Mechanical Reasoning: Able to understand the ways that hardware, machinery or tools operate and the relationships between mechanical operations.",
		spatialHead: "Spatial Reasoning: ",
		spatialBody: " Possess excellent spatial reasoning, able to judge the relationship of objects in space. Able to judge shapes and sizes of objects and manipulate them digitally or mentally and analyze the effects.",
		outdoorHead: "Outdoor Work: ",
		outdoorBody: " Enjoy working outdoors on construction, environmental or landscape projects, to manage operations or to gather technical information or environmental data.",
		tspbHead: "Troubleshooting and Problem Solving: ",
		tspbBody: " Skilled with analyzing mechanical, electrical, software or hardware problems and coming up with effective solutions."
	};

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];

	//the object which contains most of the important chunks of data
	$scope.data = { 
		techReasonTotals: [],

		mechanicalSVal: 0, 
		mechanicalMVal: 0,
		spatialSVal: 0, 
		spatialMVal: 0,
		outdoorSVal: 0, 
		outdoorMVal: 0,
		tspbSVal: 0, 
		tspbMVal: 0,
	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.techReasonTotals.push(t);
	}	


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.techReasonQuestions.mechanicalHead, $scope.techReasonQuestions.mechanicalBody, $scope.data.mechanicalSVal, $scope.data.mechanicalMVal);
		$scope.total($scope.techReasonQuestions.spatialHead, $scope.techReasonQuestions.spatialBody, $scope.data.spatialSVal, $scope.data.spatialMVal);
		$scope.total($scope.techReasonQuestions.outdoorHead, $scope.techReasonQuestions.outdoorBody, $scope.data.outdoorSVal, $scope.data.outdoorMVal);
		$scope.total($scope.techReasonQuestions.tspbHead, $scope.techReasonQuestions.tspbBody, $scope.data.tspbSVal, $scope.data.tspbMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.techReasonTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.techReasonTotals = [];
	};

}]);



//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Innovation Controller
//			Innovation Controller
//			Innovation Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('innovationCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.innovationQuestions = {
		artHead: "Artistic: ",
		artBody: " Possess excellent artistic abilities. Able to create drawings, paintings or stories using imagination. Able to use color and shapes to create visually pleasing images in one or many forms including computer images or in more traditional media. Able to create new ideas and forms with various physical objects.",
		creativeHead: "Creative or Imaginative with Ideas: ",
		creativeBody: " Using imagination, able to create new ideas, projects, or programs. Able to conceive existing elements in new ways.",
	}; 

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];


	//the object which contains most of the important chunks of data
	$scope.data = { 
		innovationTotals: [],

		artSVal: 0, 
		artMVal: 0,
		creativeSVal: 0, 
		creativeMVal: 0,

	};


	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.innovationTotals.push(t);
	}


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.innovationQuestions.artHead, $scope.innovationQuestions.artBody, $scope.data.artSVal, $scope.data.artMVal);
		$scope.total($scope.innovationQuestions.creativeHead, $scope.innovationQuestions.creativeBody, $scope.data.creativeSVal, $scope.data.creativeMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.innovationTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.innovationTotals = [];
	};

}]);




//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Teaching Controller
//			Teaching Controller
//			Teaching Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('teachingCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.teachingQuestions = {
		teachingHead: "Teaching: ",
		teachingBody: " Able to explain complex ideas, concepts, or principles in an easily understandable fashion. Able to provide knowledge or insight to individuals or groups.",
		coachingHead: "Coaching: ",
		coachingBody: " Able to assist an individual on improving his or her performance in a specific subject or skill area.",
		counselingHead: "Counseling: ",
		counselingBody: " Able to listen and sort out details and information and give advice or counsel, while engaging in a helping/supportive relationship with an individual who is experiencing distress.",
	}; 

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];


	//the object which contains most of the important chunks of data
	$scope.data = { 
		teachingTotals: [],

		teachingSVal: 0, 
		teachingMVal: 0,
		coachingSVal: 0, 
		coachingMVal: 0,
		counselingSVal: 0, 
		counselingMVal: 0,
	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.teachingTotals.push(t);
	}	


	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.teachingQuestions.teachingHead, $scope.teachingQuestions.teachingBody, $scope.data.teachingSVal, $scope.data.teachingMVal);
		$scope.total($scope.teachingQuestions.coachingHead, $scope.teachingQuestions.coachingBody, $scope.data.coachingSVal, $scope.data.coachingMVal);
		$scope.total($scope.teachingQuestions.counselingHead, $scope.teachingQuestions.counselingBody, $scope.data.counselingSVal, $scope.data.counselingMVal);


		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.teachingTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.teachingTotals = [];
	};

}]);


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//			Leadership Controller
//			Leadership Controller
//			Leadership Controller


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.controller('leadershipCtrl', ['$scope', 'scraper', function($scope, scraper){
	

	$scope.leadershipQuestions = {
		mgmtHead: "Management and Supervision: ",
		mgmtBody: " Management and Supervision: Skilled at effectively overseeing, managing or directing the work of others. Able to motivate individuals to perform at their peak level. Able to lead teams, and manage resources effectively. Skilled at managing projects, establishing time lines, meeting deadlines, and delivering high quality products and services. Able to maintain a positive working environment, empowering employees to produce a high quality product or service. Comfortable working with individuals at all levels of authority.",
		planningHead: "Planning: ",
		planningBody: " Able to plan and develop a program, project or set of ideas through organized and systematic preparation and arrangement of tasks, activities and schedules. Able to coordinate people and resources to put a plan into effect and meet specific deadlines.",
		organizationHead: "Organization: ",
		organizationBody: " Arranging people, data or objects in a systematic fashion to allow for the effective use of time and resources. Organizing information to allow for easy access.",
		detailmgmtHead: "Detail Management: ",
		detailmgmtBody: " Able to work with a great variety and/or volume of information without losing track of any items in the total situation. Comfortable managing small detail oriented tasks that are part of the larger project.",
		decisionHead: "Decision Making: ",
		decisionBody: " Comfortable making judgments or reaching conclusions about matters which require specific action. Able to accept the responsibility for and the consequences of such actions.",
	}; 

	//collection of scope arrays of objects for each set of radio buttons
	$scope.buttons = [
		{text: "1", value: 1},
		{text: "2", value: 2},
		{text: "3", value: 3},
		{text: "4", value: 4}
	];

	//the object which contains most of the important chunks of data
	$scope.data = { 
		leadershipTotals: [],

		mgmtSVal: 0, 
		mgmtMVal: 0,
		planningSVal: 0, 
		planningMVal: 0,
		organizationSVal: 0, 
		organizationMVal: 0,
		detailmgmtSVal: 0, 
		detailmgmtMVal: 0,
		decisionSVal: 0, 
		decisionMVal: 0,
	};

	$scope.total = function(head, body, s, m){
		t= {
			h: head,
			b: body,
			sum: s+m
		}
		$scope.data.leadershipTotals.push(t);
	}	



	$scope.commitVals = function(){
		//call the total function for each set of questions and add them to
		//the total for the communication section which is done individually within each function
		
		$scope.total($scope.leadershipQuestions.mgmtHead, $scope.leadershipQuestions.mgmtBody, $scope.data.mgmtSVal, $scope.data.mgmtMVal);
		$scope.total($scope.leadershipQuestions.planningHead, $scope.leadershipQuestions.planningBody, $scope.data.planningSVal, $scope.data.planningMVal);
		$scope.total($scope.leadershipQuestions.organizationHead, $scope.leadershipQuestions.organizationBody, $scope.data.organizationSVal, $scope.data.organizationMVal);
		$scope.total($scope.leadershipQuestions.detailmgmtHead, $scope.leadershipQuestions.detailmgmtBody, $scope.data.detailmgmtSVal, $scope.data.detailmgmtMVal);
		$scope.total($scope.leadershipQuestions.decisionHead, $scope.leadershipQuestions.decisionBody, $scope.data.decisionSVal, $scope.data.decisionMVal);

		//Loop through the Totals array which now contains the questions and summed values
		//for each question and send them to the scraper service using a service function 
		//called addTotal
		$scope.data.leadershipTotals.forEach( function(arrayItem){
			
			scraper.addTotal(arrayItem);
			//alert('Array values added to scraper');

		});

		$scope.data.leadershipTotals = [];
	};

}]);