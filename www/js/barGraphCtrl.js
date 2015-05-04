app.controller('BarGraphCtrl', function($scope, DataStore){
    var maxHeight = 290;
    var x = 10;
    var myColor = "green";
    var heightArray = [];
        if(document.getElementById("barGraph")){
            var context = document.getElementById("barGraph").getContext("2d");
            //var maxHeight = 280;

            //get a current timeline object
            var sectionArray = DataStore.getTimeline();
            //console.log("obj is " + obj);

            // loop through all sub sections to find total number complete per section
            // and calculate height of each bar.
            // height = maxHeight * ( numComplete / sectionArray.sections.length)
            for(index = 0; index < sectionArray.length; index++){
                //calculate height
                var height = maxHeight * ( sectionArray[index].numComplete / sectionArray[index].sections.length);

                if(myColor == "grey"){
                    myColor = "green";
                }else{
                    myColor = "grey";
                }

                //draw rectangle
                context.fillStyle = myColor;
                context.fillRect(x, 300, 36, (-1)*height);

                x += 50;
                console.log("X EQUALS = " + x);
            }   

            console.log("HOORAY!");
        }
})