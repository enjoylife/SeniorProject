function saveUser (user){
  localStorage.setItem('user', JSON.stringify(user));
}

function loadUser(){
  return JSON.parse(localStorage.getItem('user'))
}




app.controller('profile',function($scope){
  var quoteArray = [{quote:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.", cite:"Someone famous"}];
  $scope.quoteObj = quoteArray[0];
  $scope.imageSrc = 'css/sjs-logo.png';
  // I do not set within user
   $scope.picture = JSON.parse(localStorage.getItem('userProfilePicture'));
   $scope.imageSrc = $scope.picture;


  $scope.user = loadUser();

  $scope.randQuote = function(){
    var i = _.random(0, quoteArray.length -1);
    $scope.quoteObj = quoteArray[i];
  }

  $scope.saveLocal = function(str){
    saveUser($scope.user);
  }

  function onSuccess(imageURI) {
    $scope.picture = imageURI;
    var image = document.getElementById('profileImage');
    image.src = imageURI;
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}


// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}

$scope.$watch('imageSrc', function(){
  

  // img.src = $scope.imageSrc;
})
  // Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
   console.log(typeof(imageURI) != 'undefined');

  // Get image handle
  var data = "data:image/jpeg;base64," + imageURI;
  $scope.imageSrc = data;
  localStorage.setItem('userProfilePicture', JSON.stringify(data));
  var img = document.getElementById('profilePic');
  img.src = data;

}

  // A button will call this function
  $scope.getPhoto = function () {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL ,
        sourceType: pictureSource.SAVEDPHOTOALBUM });
    }

$scope.randQuote()

})
