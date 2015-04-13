/**
 * Created by matt on 4/7/15.
 */

//MAIN CONTROLLER
app.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate, $localstorage, contactService, $ionicPlatform, $ionicPopup, $ionicHistory, $rootScope, $ionicScrollDelegate,DataStore) {

    /* Get count of contacts for display */
    var load = $localstorage.getObject( 'contacts' );
    if (Object.keys(load).length !== 0) {
        contactService.loadList( load );
    }
    $scope.count = contactService.getContactsService().length;

    //complimentary function to track ng-repeat items in reverse
    //subtract array.length-1 from index
    //return absval() of the result
    $scope.reverseIndex = function(ind, array){
        var res = ind - (array.length-1);
        return Math.abs(res);
    }


  //disables verticle scrolling on the selected page 
  //and always scrolls to top of state
  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){ 
    
    if($state.current.name=='profile'){
      window.setInterval(function(){
        $("#leftArrow").fadeToggle('slow');
        $("#rightArrow").fadeToggle('slow');
      }, 1000);
      $ionicScrollDelegate.getScrollView().options.scrollingY = false;
    }else{
      $ionicScrollDelegate.getScrollView().options.scrollingY = true;         
    }
    
    //scrollBottom() if navigating to holland assessment
    //from career binder
    if(fromState.name == 'binder-asmntResults' && toParams.file == 'personality.html'){// && $state.is('career.sections', {'folder':'assessment', 'file':'personality.html'}) == true){
      //event.preventDefault();
      $ionicScrollDelegate.scrollBottom();
    }else{
      $ionicScrollDelegate.scrollTop();
    }

  })


    //Android hardware backbutton
    var deregister = $ionicPlatform.registerBackButtonAction(function(e) {
         //app close at profile
        if($state.current.name=="profile"){
            navigator.app.exitApp();
        }//prevent users from going back into assessments after completion
        else if($state.current.name=="binder-asmntResults"){
            $state.go("binder");
        }
        else if($state.current.name=="binder"){
            $state.go("profile");
        }
        else {
            navigator.app.backHistory();
        }
    }, 100);
    $scope.$on('$destroy', deregister);

    //always set pop to 0 after backbutton press
    $ionicPlatform.onHardwareBackButton(function(e){
        $rootScope.pop = 0;
    })

    //function to scroll top for each view
    $scope.setScreen = function(){
        $ionicScrollDelegate.scrollTop();
    }

    //swiping navigation
    $scope.swipingLogicLeft = function(){
        console.log("swipe Left");

        if($ionicSideMenuDelegate.isOpen()) {
            $ionicSideMenuDelegate.toggleLeft();
            return;
        }

        if($state.is('content.sections')){
            $state.go('profile');
        }

        if($state.is('profile')){
            $state.go('binder');
        }

    }
    $scope.swipingLogicRight = function(){
        if($state.is('content.sections')){
            $ionicSideMenuDelegate.toggleLeft();
        }
        if($state.is('profile')){
            var last = DataStore.getGlobalLast();
            $state.go('content.sections', last)
        }
        if($state.is('binder')){
            $state.go('profile');
        }
        if($state.is('binder-ideas')||
            $state.is('binder-calendar') ||
            $state.is('binder-toDo') ||
            $state.is('binder-asmntResults') ||
            $state.is('binder-contacts') ||
            $state.is('binder-jobApps') ||
            $state.is('binder-individualAsmntResults')){
            console.log("includes")
            $state.go('binder');
        }
    }

    $scope.getSecAndSub = function(timeline, params){

        var section = _.find(timeline, function(obj){
            return obj.folder == params.folder;
        })
        if(!section) throw new Error("Could not find Section");

        var subsection = _.find(section.sections, function(obj){
            return obj.file == params.file;
        })
        if(!subsection) throw new Error("Could not find Subsection");
        
        return {'section': section,'subsection':subsection}
    };

    //code to verify if user wants to navigate to seriousjobseeker.com 
    $scope.verifyNav = function(){
        $ionicPopup.confirm({
            title:'You are leaving the app to go to www.SeriousJobSeeker.com',
            //template:'You must input at least one value.'
        })
        .then(function(res){
            if(res){
                window.open("http://www.seriousjobseeker.com/", "_blank");
            }else{}
        })
    }

});
