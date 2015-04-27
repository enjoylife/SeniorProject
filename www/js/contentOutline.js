// Main properties of objects must correspond with sub-folders inside the template folder
// Strings defined in section order per those main objects define files within those sub-folders.
var defaultBook = [

	// Each section needs:
	// title, leadIn, sectionOrder and a number of objects defining the subsections
	{
		folder:'intro',
		// TItle to display in timeline (short and Simple)
		title:"Introduction",

		sections:[
			{
				file:'sjs1-0.html',
				title:"Introduction to job seeking",
			},
			{
				file:'sjs1-2.html',
				title:"Job Seeking and Career Planning is a Journey. This is the path you will follow",
			},
			{
				file:'sjs1-3.html',
				title:"The Big Picture",
			},
			{
				file:'sjs1-4.html',
				title:"Career Planning Challenges: the tasks that lie ahead...",
			}
		]
	},

	{
		folder:'careerbinder_text',
		title:'Staying Organized',
		sections: [
			{
				file:'sjs2-0.html',
				title:'Your Career Binder ... absolutely essential!'
			},
		]
	},

	{
		folder:'assessment',
		title:"Assessments",

		sections:[
			{
				file:'personality.html',
				title:'Career Personality Type'
			},
			{
				file:'skills.html',
				title:'Motivated Skills Inventory'
			},
			{
				file:'values.html',
				title:'Work Values and Priorities'
			},
			{
				file:'knowledge.html',
			 	title : "Key Knowledge Areas"
			},
			{
			 	file:'interests.html',
			 	title: "Life Interests and Passions"
			},
			{
			 	file: 'environment.html',
			 	title: "Your Ideal Life/Work Environment"
			},
			{
			 	file:'goals.html',
			 	title: 'Your Goals and Priorities'
			}
		],
	},

	{
		folder:'searchStrategy',
		title: "Job Search Strategy",
		//leadIn: "TODO",
		//this is the order Cici would like text to be displayed in job search strategy
		sections :[
			 {
				file:'sjs8-0.html',
				title:"Intro: Networking to Your Perfect Job"
			},
			{
				file:'sjs8-10.html' ,
				title:"Networking is a Contact Sport!"
			},
			 {
				file:'sjs8-4.html',
				title:"How to Arrange an Informational Interview"
			},
			{
				file:'sjs8-5.html',
				title:"How to Approach an Informational Interview"
			},
			{
				file:'sjs8-6.html',
				title:"After the Informational Interview"
			},

		]
	},
	
	{
		folder:'resume',
		title: "Resumes",

		sections :[
			 {
				file:'sjs9-0.html',
				title:"Resume Explained"
			},
			{
				file:'sjs9-1.html' ,
				title:"Resume Samples"
			},
			 {
				file:'sjs9-2.html',
				title:"Portfolio Construction"
			},
		]
	},

	{
		folder:'interviews',
		title: "Interviews",
		//leadIn: "TODO",
		sections :[
			 {
				file:'sjs10-1.html',
				title:"What to do before you start interviewing"
			},
			{
				file:'sjs10-2.html' ,
				title:"Typical Questions Asked During Interviews"
			},
			 {
				file:'sjs10-3.html',
				title:"Quick Guide to Phases of a Successful Job Interview"
			},
			{
				file:'sjs10-4.html',
				title:"Asking the interviewer Questions Gets the Job!"
			},
			{
				file:'sjs10-5.html',
				title:"Phone Interviews Done Right!"
			},
			{
				file:'sjs10-6.html',
				title:"Interview and Dining Etiquette: You are being judged!!"
			},
			{
				file:'sjs10-7.html',
				title:"Costly Errors That Kill Job Offers"
			},
			{
				file:'sjs10-8.html',
				title:"Youthful indiscretions"
			},
			{
				file:'sjs10-9.html',
				title:"Does the handshake matter?"
			},
			{
				file:'sjs10-10.html',
				title:"Polishing Your Interviewing Skills: A Word to ESL Candidates"
			},
			{
				file:'sjs10-11.html',
				title:"Practical Strategies for Optimal English Communication During Interviews"
			},




		]
	}
	
];