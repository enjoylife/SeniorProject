// Main properties of objects must correspond with sub-folders inside the template folder
// Strings defined in section order per those main objects define files within those sub-folders.
var contentOutline = {
	// Total Order for main Sections, each index corresponds to two things:
	// a main section object defined below and sub folder inside the template/sections directory

	ordering: ["intro","assessment"],


	// Each section needs:
	// title, leadIn, sectionOrder and a number of objects defining the subsections
	"intro":{

		// TItle to display in timeline (short and Simple)
		title:"Introduction",

		//  Title when section is selected in timeline (longer and )
		leadIn:"Test paragraph which gives user an idea of whats in the section",

		// What order are the subsections to be shown. Each index corresponds to
		// a file within the section's folder.
		sectionOrder :['intro','sjs1-2','sjs1-3','sjs1-4'],

		intro: {
			title:"Introduction to job seeking",
		},
		'sjs1-2': {
			title:"Job Seeking and Career Planning is a Journey. This is the path you will follow",
		},
		'sjs1-3': {
			title:"The Big Picture",
		},
		'sjs1-4': {
			title:"Career Planning Challenges: the tasks that lie ahead...",
		}
	},

	"assessment": {
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['personality','skills','values','knowledge','interests', 'environment','goals'],
		personality :{
			title:'career Personality Type'
		},
		skills :{
			title: 'Motivated Skills Assessment'
		},
		values :{
			title: 'Work Values and Priorities'
		},
		knowledge :{
			title : "Key Knowledge Areas"
		},
		interests : {
			title: "Life Interests and Passions"
		},
		environment : {
			title: "Your Ideal Life/Work Environment"
		},
		goals : {
			title: 'Your Goals and Priorities'
		}
	},

	/*"search": {
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['section1','section2','section3','section4']
	},

	"resume" : {
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['section1','section2','section3','section4']
	},

	"interview" : {
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['section1','section2','section3','section4']
	}*/
}