angular.module('starter.controllers', [])

.controller('RegistrationCtrl', function($scope, AuthFactory) {
  $scope.signupForm = {};
  console.log("hi");
  console.log($scope.signupForm);
  $scope.register = register;


  ///////////

  function register(){
    console.log('submit')
    console.log($scope.signupForm)

    AuthFactory.register($scope.signupForm)
      .then(function(){
        console.log('Yay successfully registered ', $scope.signupForm.name)

      }, function(){
        console.log('Did not work :/')
      })



  }

})


.controller('DashCtrl', function($scope, AuthFactory) {

})


.controller('FriendsCtrl', function(Friends) {
    var vm = this;
    vm.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($stateParams, Friends) {
    var vm = this;
    vm.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
