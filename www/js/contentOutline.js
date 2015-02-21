// Main properties of objects must correspond with sub-folders inside the template folder
// Strings defined in section order per those main objects define files within those sub-folders.
var contentOutline = [

	// Each section needs:
	// title, leadIn, sectionOrder and a number of objects defining the subsections
	{
		folder:'intro',
		// TItle to display in timeline (short and Simple)
		title:"Introduction",

		//  Title when section is selected in timeline (longer and )
		leadIn:"Introduction to The Serious Job Seeker",

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
				file:'sjs-1-4.html',
				title:"Career Planning Challenges: the tasks that lie ahead...",
			}
		]
	},

	{
		folder:'assessment',
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sections :[
			{
				file:'personality.html',
				title:'career Personality Type'
			},
			{
				file:'skills.html',
				title: 'Motivated Skills Assessment'
			},
			{
				file:'values.html',
				title: 'Work Values and Priorities'
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
		leadIn: "TODO",
		sections :[
			 {
				file:'sj8-0.html',
				title:"TODO"
			},
			{
				file:'sj8-4.html' ,
				title:"TODO"
			},
			 {
				file:'sj8-5.html',
				title:"TODO"
			},
			{
				file:'sj8-6.html',
				title:"TODO"
			},
			{
				file:'sj8-10.html',
				title:"TODO"
			},

		]
	}
]