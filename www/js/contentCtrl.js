/**
 * Created by matt on 4/7/15.
 */
app.controller('contentCtrl',function($scope, $state,$ionicScrollDelegate, $localstorage){
    var
        currentPosition,
        currentContent,
        isComplete;


    $scope.leadIn = function(){
        var section = _.find(contentOutline, function(obj){

            return obj.folder == $state.params.folder;
        })

        var subsection = _.find(section.sections, function(obj){
            return obj.file == $state.params.file;
        })

        return subsection.title;
    }



    // Returns null if no more sections and subections
    // otherwise it will return an obejct with the next section and subsection for the router
    var nextSubSection = function(){

        // Total number of folders of content
        var sectionLen    = contentOutline.length -1;

        // Which folder are we in
        var secNum = _.findIndex(contentOutline, function(obj){
            return obj.folder == $state.params.folder;
        })
        var section = contentOutline[secNum];

        // Total number of subsections
        var subsectionLen = section.sections.length - 1;

        // Which file are we in
        var subNum = _.findIndex(section.sections, function(obj){
            return obj.file == $state.params.file;
        })

        var
            isSecEnd = (secNum == sectionLen),
            isSubEnd = (subNum == subsectionLen);

        // If end of all sections and subsections bail
        if(isSecEnd && isSubEnd){
            return null;
        }

        // More subsections show next subsection, stay on this section
        if(!isSubEnd) {
            return {
                folder: $state.params.folder,
                file: section.sections[subNum+1].file
            }
        }
        // Final condition...
        var nextSec = contentOutline[secNum+1];
        return {
            folder:nextSec.folder,
            // First subsection
            file:nextSec.sections[0].file
        }

        // If we reached here some logic went wrong...
        throw new Error("Bad Logic in nextSubSection")
    }
    $scope.goNext = function(){
        var next = nextSubSection();
        $localstorage.setObject('lastSection', next);
        $ionicScrollDelegate.scrollTop();
        $state.go('content.sections', next)
        $ionicScrollDelegate.resize();


        // $uiViewScroll($(".content-wrapper"));
    }

    $scope.markDone = function(){
        var section = _.find(contentOutline, function(obj){
            return obj.folder == $state.params.folder;
        })

        var subsection = _.find(section.sections, function(obj){
            return obj.file == $state.params.file;
        })
        if(!subsection.complete){
            subsection.complete = true;
            section.numComplete++;
        }
        section.lastRead = subsection.lastRead = moment().startOf('minute').fromNow();
        $scope.goNext();
    }


})
