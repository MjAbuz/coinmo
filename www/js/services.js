var baseUrl = 'http://localhost:3000';


angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


.factory('AuthFactory', ['$http',
  function($http) {
    var _authFactory = {};

    _authFactory.register = function(user) {
      return $http.post(baseUrl + '/account', user);
    }

    _authFactory.login = function(user) {
      return $http.post(baseUrl + '/api/v1/auth/login', user);
    }

    return _authFactory;
  }
])

.factory('SessionFactory', ['$window',
  function($window) {
    var _sessionFactory = {};

    _sessionFactory.createSession = function(user) {
      console.log('creating session');
      return $window.localStorage.user = JSON.stringify(user);
    },

      _sessionFactory.getSession = function(user) {
        return JSON.parse($window.localStorage.user);
      },

      _sessionFactory.deleteSession = function() {
        delete $window.localStorage.user;
        return true;
      }

    _sessionFactory.checkSession = function() {
      if ($window.localStorage.user) {
        return true;
      } else {
        return false;
      }
    }

    return _sessionFactory;
  }
])

.service("ContactsService", ['$q', function($q) {

  var formatContact = function(contact) {

    return {
      "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
      "emails"        : contact.emails || [],
      "phones"        : contact.phoneNumbers || [],
      "photos"        : contact.photos || []
    };

  };

  var pickContact = function() {

    var deferred = $q.defer();

    if(navigator && navigator.contacts) {

      navigator.contacts.pickContact(function(contact){

        deferred.resolve( formatContact(contact) );
      });

    } else {
      deferred.reject("Bummer.  No contacts in desktop browser");
    }

    return deferred.promise;
  };

  return {
    pickContact : pickContact
  };
}]);




