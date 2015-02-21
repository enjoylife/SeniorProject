app.controller('profile',function($scope){
  var quoteArray = [{quote:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.", cite:"Someone famous"}];
  $scope.quoteObj = quoteArray[0];
  $scope.picture = localStorage.getItem('userProfilePicture');

  $scope.randQuote = function(){
    var i = _.random(0, quoteArray.length -1);
    $scope.quoteObj = quoteArray[i];
  }


  function onSuccess(imageURI) {
    var image = document.getElementById('profileImage');
    image.src = imageURI;
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      localStorage.setItem('userProfilePicture',imageURI )
    }, function(err) {
      console.err(err);
    },
    {
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  }

$scope.randQuote()

})

app.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);