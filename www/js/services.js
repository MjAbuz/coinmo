var baseUrl = 'http://localhost:3000';


angular.module('starter.services', [])


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

.factory('TransactionService', ['$http',
  function($http) {
    var _transactionFactory = {};

    _transactionFactory.requestCoin = function(transaction) {
      console.log('request coin: ', transaction);
      return $http.post(baseUrl + '/transaction/request', transaction);
    }

    _transactionFactory.sendCoin = function(transaction) {
      console.log('send coin: ', transaction);

      var from_phone = transaction.from_phone;
      var to_phone = transaction.to_phone;
      var amount = transaction.amount * 100000000;
      return $http.post(baseUrl + '/user/' +
        from_phone + '/pay/' + to_phone + '/amount/' + amount);
    }

    return _transactionFactory;
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




