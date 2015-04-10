/**
 * Created by matt on 4/6/15.
 */


app.service('DataStore', function(){

  this.timelineCache =   JSON.parse(window.localStorage.getItem('timeline'));

     this.setObject = function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    this.getObject = function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    /**
     * Methods related to the book content and timeline state
     */
    this.setTimeline  = function() {
        this.setObject('timeline', this.timelineCache);
    }

    this.clearTimeline  = function(){
        this.setObject('timeline',null);
    }

    this.getTimeline  = function() {
        return this.timelineCache;
    }

    this.setGlobalLast = function(params){
      this.setObject('globalLast',params)
    }

    this.getGlobalLast = function(){
      this.getObject('globalLast');
    }

    this.getSection = function(params){
      return _.find(this.getTimeline(), function(obj){
            return obj.folder == params.folder;
        })
    }

    this.getSubsection = function(params){
      var sec = this.getSection(params);
      return _.find(sec.sections, function(obj){
            return obj.file == params.file;
        })
    }

    /**
     * Methods for recording the users usage and opening of our app
     */

    this.incUsage  = function() {
        var usage =  this.getObject(('usage'));
        if(!usage){
          usage = {timesLaunched:1, lastLaunched:moment()}
        } else{
          usage.timesLaunched++;
          usage.lastLaunched = moment();
        }
        this.setObject('usage', usage);
    }

    this.getUsage  = function() {
        return this.getObject('usage');
    }


    /**
     * Helper to create initial required data using the book object as a seed
     */
    this.initTimeline = function() {
        // Remove old book Book
        this.clearTimeline();

        var newBook = defaultBook;

        newBook.map(function (chapters) {

            // each chapter
            chapters['numComplete'] = 0;
            chapters['lastRead'] = null;

            // Iterate over each minor subsection
            chapters.sections.map(function (sub) {

                sub['complete'] = false;
                sub['lastRead'] = null;
                sub['lastLocation'] = 0;

            })
        });

        // Set new book
        this.timelineCache = newBook;
        this.setTimeline();
    }
});

// For visual debuging in console
window.addEventListener('storage', function(e) {
    console.log("K: ",e.key, " V: ", e.newValue);
}, false);


//filter which allows reverse layout of ng-repeat items
app.filter('reverse', function(){
    return function(items) {
        return items.slice().reverse();
    };
});


//Used for storing objects and converting to and from JSON
// TODO: Remove
app.factory('$localstorage', ['$window', function($window) {
  
  function set(key, value) {
      $window.localStorage[key] = value;
  }
  
  function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
  }
  
  function setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
  }
  
  function getObject(key) {
      return JSON.parse($window.localStorage[key] || '{}');
  }
  
  return {
    set: set,
    get: get,
    setObject: setObject,
    getObject: getObject
  }
}]);

app.service('contactService', function() {
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

});