angular.module('starter.controllers', [])

.controller('RegistrationCtrl', function($scope, AuthFactory, $state) {
  $scope.signupForm = {};
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

          if(res.error){
            $scope.serverError = res.error;

          } else {
            console.log('Yay successfully registered ', res)
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

.controller('AccountCtrl', function($scope) {

    $scope.user = { balance: 0.15, name: 'Jono Kassan', quid: 999993 }
})

.controller('HistoryCtrl', function($scope) {

});
