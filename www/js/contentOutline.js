// Main properties of objects must correspond with sub-folders inside the template folder
// Strings defined in section order per those main objects define files within those sub-folders.
var contentOutline = {
	ordering: ["intro","assement", "search", "resume","interview"],

	"intro":{
		// TItle to display in timeline
		title:"",
		//  String to show in timeline
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['intro','intro2','intro3','intro4'],
		intro: {
			// TItle to display in timeline
			title:"",
		}
	},

	"assement": {
		title:"",
		leadIn:"Test paragraph which gives user an idea of whats in the section",
		sectionOrder :['section1','section2','section3','section4']
	},

	"search": {
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
	}
}