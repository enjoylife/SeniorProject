//binder contacts controller

app.controller('contactsCtrl', ['$scope', '$cordovaContacts', function($scope, $cordovaContacts) {
	$scope.addContact = function() {
		$cordovaContacts.save({"Adam Proulx"}}).then(function(result) {
			console.log("CONTACT ADDED");
		}, function(err){
			console.log("ERROR");
		});
	};
}]);