//binder contacts controller

app.controller('contactsCtrl', ['$scope', '$cordovaContacts', function($scope, $cordovaContacts) {
	$scope.addContact = function() {
		$scope.contactObj = {
			displayName: 'Jane Doe',
			phoneNumbers: ['123456', '123'],
			emails: ['abcdefg@email.com'],
			note: ''
		};

		$cordovaContacts.save($scope.contactObj).then(function(result) {
			console.log("CONTACT ADDED");
		}, function(err){
			console.log("ERROR");
		});
	};
}]);