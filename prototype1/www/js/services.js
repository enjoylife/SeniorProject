var app = angular.module('starter', ['ionic'])

/**
 * A simple example service that returns some data.
 */
app.factory('Add', function() {
  // Might use a resource here that returns a JSON array
  var list = [];
  
  var Adder = function ( text ) {
    list.push( text );
	alert.("Here");
  }  

  return {
    Adder: Adder;
  };
}
});
