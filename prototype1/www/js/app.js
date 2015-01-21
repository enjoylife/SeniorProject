
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MainCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
  
  .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
	
  .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

  .state('app.binder', {
      url: "/binder",
      views: {
        'menuContent': {
          templateUrl: "templates/binder.html",
        }
      }
    })
	
  .state('app.binder-toDo', {
      url: "/binder/toDo",
      views: {
        'menuContent': {
          templateUrl: "templates/binder-toDo.html",
          controller: 'ToDoCtrl'
        }
      }
    })
	
	.state('app.binder-ideas', {
      url: "/binder/ideas",
      views: {
        'menuContent': {
          templateUrl: "templates/binder-ideas.html",
          controller: 'IdeaCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

