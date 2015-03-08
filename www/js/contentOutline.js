// Main properties of objects must correspond with sub-folders inside the template folder
// Strings defined in section order per those main objects define files within those sub-folders.
var contentOutline = [

	/*{
		folder:'interview',
		title:'Interview',
		sections: [
		{
			file:'intro.html',
			title:'Interviews - the essentials of your presentation'
		}
		]
	},*/
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
		folder: 'careerbinder_text',
		title: 'Staying Organized',
		sections: [
			{
				file: 'sjs2-0.html',
				title: 'Your Career Binder ... absolutely essential!'
			},
		]
	},

	{
		folder:'assessment',
		title: "Assessments",

		sections:[
			{
				file:'personality.html',
				title:'Career Personality Type'
			},
			{
				file:'skills.html',
				title: 'Motivated Skills Inventory'
			},
			// {
			// 	file:'values.html',
			// 	title: 'Work Values and Priorities'
			// },
			// {
			// 	file:'knowledge.html',
			// 	title : "Key Knowledge Areas"
			// },
			// {
			// 	file:'interests.html',
			// 	title: "Life Interests and Passions"
			// },
			// {
			// 	file: 'environment.html',
			// 	title: "Your Ideal Life/Work Environment"
			// },
			// {
			// 	file:'goals.html',
			// 	title: 'Your Goals and Priorities'
			// }
		],
	},

	{
		folder:'searchStrategy',
		title: "Job Search Strategy",
		//leadIn: "TODO",
		sections :[
			 {
				file:'sjs8-0.html',
				title:"Networking to Your Perfect Job"
			},
			{
				file:'sjs8-4.html' ,
				title:"TODO"
			},
			 {
				file:'sjs8-5.html',
				title:"TODO"
			},
			{
				file:'sjs8-6.html',
				title:"TODO"
			},
			{
				file:'sjs8-10.html',
				title:"TODO"
			},

		]
	}
];