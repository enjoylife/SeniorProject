app.controller('timelineCtrl',function($scope, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, $localstorage, DataStore){
    $scope.timeline = DataStore.getTimeline();
     // $ionicSideMenuDelegate.toggleLeft();

    console.log($scope.timeline);

    $scope.getSubsections = function(section){

        return $scope.timeline[section].sectionOrder;
    }

    $scope.getTitle = function(section, subsection){

        return $scope.timeline[section][subsection].title;
    }

    $scope.jumpToSection = function(params){

        // Keep our sanity by proactivaly checking for erros in the templates
        if(!('file' in params && 'folder' in params)){
            throw new Error("Missing required parameter for jumping into sections.")
        }

        console.log('Routing to content/'+params.folder +'/'+ params.file)

        // Remember where we last jumped around to
        DataStore.setGlobalLast(params);

        // Go to the html page
        $state.go('content.sections',params);

        var section = DataStore.getSection(params);
        var subsection = DataStore.getSubsection(params);

        section.lastRead = subsection.lastRead = moment().startOf('minute').fromNow();

        // Finally update
        DataStore.setTimeline($scope.timeline);

        $ionicScrollDelegate.scrollTop();
        $ionicScrollDelegate.resize();


    };

})