/**
 * Created by matt on 4/7/15.
 */
app.controller('timelineCtrl', ['$scope', '$state', '$ionicScrollDelegate', '$localstorage', function($scope, $state, $ionicScrollDelegate, $localstorage){
    $scope.contentOutline = contentOutline;

    $scope.getSubsection = function(section){

        return contentOutline[section].sectionOrder;
    }

    $scope.getTitle = function(section, subsection){

        return contentOutline[section][subsection].title;
    }

    $scope.jumpToSection = function(params){

        if(!('file' in params && 'folder' in params)){
            throw new Error("Missing required parameter for jumping into sections.")
        }
        console.log('Routing to content/'+params.folder +'/'+ params.file)
        $localstorage.setObject('lastSection', params);
        $state.go('content.sections',params);
        $scope.setHistory();

        var section = _.find(contentOutline, function(obj){
            return obj.folder == params.folder;
        })



        var subsection = _.find(section.sections, function(obj){
            return obj.file == params.file;
        })

        section.lastRead = subsection.lastRead = moment().startOf('minute').fromNow();

        $ionicScrollDelegate.scrollTop();
        $ionicScrollDelegate.resize();


    };



    $scope.setHistory = function(){

        localStorage.setItem('hist', JSON.stringify(contentOutline));
    }
}])