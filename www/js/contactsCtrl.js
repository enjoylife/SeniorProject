//binder contacts controller

app.controller('contactsCtrl', ['$scope', '$cordovaContacts', '$ionicPopup', '$localstorage', 'contactService', function($scope, $cordovaContacts, $ionicPopup, $localstorage, contactService) {
	$scope.contactObj = {
		displayName: '',
		phoneNumbers: [
			new ContactField('main')
		],
		emails: [
			new ContactField()
		],
		addresses: [
			new ContactAddress()
		],
		organizations: [
			new ContactOrganization()
		],
		note: '',
	};
	
	  /* Load from local storage */
	  var load = $localstorage.getObject( 'contacts' );
	  if (Object.keys(load).length !== 0) {
		contactService.loadList( load );
	  }

	//this variable will be used to keep track of ionic popups
	$rootScope.pop = 0;

	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	console.log($rootScope.pop);
	if($rootScope.pop){
	  event.preventDefault(); 
	}
	  // transitionTo() promise will be rejected
	})

	  
	//command a popup to open when user wants to add a new contact
	$scope.contactForm = function(){
		$rootScope.pop = 1;
		var newContact = $ionicPopup.show({
			title: 'New Professional Contact',
			templateUrl: 'templates/binder/binder-contact-popup.html', //create this template
			scope: $scope,
			buttons: [
				{
					text: 'Cancel',
					onTap: function(e){
						$rootScope.pop = 0;
					}
				},
				{
					text: 'Submit',
					onTap: function(e){
						$scope.addContact();
					}
				}
			]
		});
	};


	//command popup to open for edit function
	$scope.editContactForm = function( item, index ){
		var tmp = item;
		
		$scope.contactObj.displayName = item.displayName;
		$scope.contactObj.phoneNumbers[0].value = item.phoneNumbers[0].value;
		$scope.contactObj.emails[0].value = item.emails[0].value;
		$scope.contactObj.organizations[0].name = item.organizations[0].name;
		$scope.contactObj.note = item.note;
		
		$rootScope.pop = 1;
		var editContact = $ionicPopup.show({
			title: 'Edit Contact',
			templateUrl: 'templates/binder/binder-contact-popup.html',
			scope: $scope,
			buttons: [
				{
					text: 'Cancel',
					onTap: function(e){
						$rootScope.pop = 0;
					}
				},

				{
					text: 'Update',

					onTap: function(e){
						var editIndex = contactService.getContactsService().indexOf(tmp);
						contactService.editContactsService( $scope.contactObj, index);
						$localstorage.setObject( 'contacts', contactService.getContactsService() );
						$rootScope.pop=0;

						$scope.contactObj = {
							displayName: '',
							phoneNumbers: [
								new ContactField('main')
							],
							emails: [
								new ContactField()
							],
							addresses: [
								new ContactAddress()
							],
							organizations: [
								new ContactOrganization()
							],
							note: '',
						};
					}
				}

			]

		});
	}






	$scope.addContact = function() {
		$rootScope.pop=0;
	
		$cordovaContacts.save($scope.contactObj).then(function(result) {
			console.log("CONTACT ADDED");
		}, function(err){
			console.log("ERROR");
		});
		//$scope.useContactService = function(contact){
		contactService.addContactService($scope.contactObj);
		$localstorage.setObject( 'contacts', contactService.getContactsService() );


		$scope.contactObj = {
			displayName: '',
			phoneNumbers: [
				new ContactField('main')
			],
			emails: [
				new ContactField()
			],
			addresses: [
				new ContactAddress()
			],
			organizations: [
				new ContactOrganization()
			],
			note: '',
		};
		
	};

	  // Remove Contact
	  $scope.removeContact = function(index) {
	   var confirmPopup = $ionicPopup.confirm({
		 title: 'Contacts',
		 template: 'Are you sure you want to delete this contact?'
	   });
	   confirmPopup.then(function(res) {
		 if(res) {
		   contactService.removeContactsService( index );
		   $localstorage.setObject( 'contacts', contactService.getContactsService() );
		 } else {
		   
		 }
	   });
	 };

	//create new array to attach factory list to $scope
	$scope.output = [];

	$scope.getContacts = function(){
		$scope.output = contactService.getContactsService(); 
		return $scope.output;
	}	
}]);



//contacts factory
app.factory('contactService', function() {
	var contactsArray = [];
	
	function loadList(load) {
		contactsArray = load;
	}
	
	//add contact
	function addContactService(contact) {
		contactsArray.push(contact);
	}

	function getContactsService(){
		return contactsArray;
	}

	function editContactsService( item, index ){
    	removeContactsService( index );
		contactsArray.splice( index, 0, item );
  	}
	
	function removeContactsService( index ) {
		contactsArray.splice(index, 1);
	}
	
	function getContactIndex( index ) {
		return contactsArray[index];
	}

	return {
		loadList: loadList,
		addContactService: addContactService,
		getContactsService: getContactsService,
		editContactsService: editContactsService,
		removeContactsService: removeContactsService
	}

})