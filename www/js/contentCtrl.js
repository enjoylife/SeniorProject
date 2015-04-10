/**
 * Created by matt on 4/7/15.
 */
app.controller('contentCtrl',function($scope, $state,$ionicScrollDelegate, $localstorage, DataStore){
    var
        currentPosition,
        currentContent,
        isComplete;


    $scope.leadIn = function(){
        return DataStore.getSubsection($state.params).title;
    }


    // Returns null if no more sections and subections
    // otherwise it will return an obejct with the next section and subsection for the router
    var nextSubSection = function(){
        var book = DataStore.getTimeline();

        // Total number of folders of content
        var sectionLen    = book.length -1;

        // Which folder are we in
        var section =  DataStore.getSection($state.params);
        var secNum = _.findIndex(book,section);

        console.log(secNum)
        console.log(section);

        // Total number of subsections
        var subsectionLen = section.sections.length - 1;

        // Which file are we in
        var subNum = _.findIndex(section.sections,{'file':$state.params.file});

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
        var nextSec = book[secNum+1];
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
        DataStore.setGlobalLast(next);

        $ionicScrollDelegate.scrollTop();

        $state.go('content.sections', next)

        $ionicScrollDelegate.resize();

    }

    $scope.markDone = function(){
        var section = DataStore.getSection($state.params);
        var subsection = DataStore.getSubsection($state.params);

        if(!subsection.complete){
            subsection.complete = true;
            section.numComplete++;
        }
        section.lastRead = subsection.lastRead = moment().startOf('minute').fromNow();
        // Finally update
        DataStore.setTimeline();
        $scope.goNext();
    }


})
