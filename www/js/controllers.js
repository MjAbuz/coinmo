angular.module('starter.controllers', [])

.controller('RegistrationCtrl', function($scope, AuthFactory, SessionFactory, $state) {
  $scope.signupForm = {};
  $scope.currentUser = SessionFactory.checkSession() ? SessionFactory.getSession() : null;
  console.log("hi");
  console.log($scope.signupForm);
  $scope.register = register;


  ///////////

  function register(){
    console.log('submit')
    console.log($scope.signupForm)

    if ($scope.signup_form.$valid){
      AuthFactory.register($scope.signupForm)
        .then(function(res){
          console.log('got response', res);

          if(res.data.error){
            $scope.serverError = res.data.error;

          } else {
            console.log('Yay successfully registered ', res)
            $scope.signupForm.guid = res.guid;
            SessionFactory.createSession($scope.signupForm);
            $state.go('tab.account')
          }

        }, function(){

          console.log('Did not work :/')
        })

    } else {
      $scope.signup_form.submitted = true;
      console.log('form invalid');
    }
  }

})


.controller('DashCtrl', function($scope, AuthFactory) {

})


.controller('PayCtrl', function($scope, Friends) {

    console.log('loads')
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, SessionFactory) {

    $scope.user = SessionFactory.checkSession() ? SessionFactory.getSession() : null;

    $scope.user.balance = 0.15;

    console.log($scope.user);
});
