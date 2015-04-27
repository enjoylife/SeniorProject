/**
 * Angular's way of encapsulation.
 * Only export and to be used by almost every other component in our app

 */
var app = angular.module('prototype', [ 'ionic', 'ngCordova', 'ui.calendar', 'ui.bootstrap', 'ui.router']);


/**
 * TODO: is $ionicHistory needed here?
 */
app.run(function($ionicPlatform, $ionicScrollDelegate, $rootScope, $ionicHistory, $localstorage, DataStore) {

    $ionicPlatform.ready(function() {
        //$localstorage.setObject('DesiredCareer', []);
        if(window.cordova &&  window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.disableScroll(true);
        }

        // TODO: Does this fix scrolling behavior
        $rootScope.$on('$viewContentLoaded',
        function(){
            $ionicScrollDelegate.freezeScroll(true);
            window.setTimeout(function(){
                $ionicScrollDelegate.freezeScroll(false);
                $ionicScrollDelegate.resize();
                // console.log($ionicScrollDelegate.getScrollView().__contentHeight);
            },1500)
        });        
    });

    /**
     * Logic for first time users vs existing users goes here
     */
    
    if(DataStore.getUsage()){
        console.log("Existing User");
        console.log("Running version: ", DataStore.getVersion())
    } else {
        console.log("New User");
        // remove all old stuff and start anew
        window.localStorage.clear();
        // Give user a fresh state to begin with
        DataStore.initTimeline();
        
    }
    DataStore.incUsage();
});