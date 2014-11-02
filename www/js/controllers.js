angular.module('starter.controllers', [])

.controller('RegistrationCtrl', function($scope, AuthFactory, SessionFactory, $state) {
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


.controller('DashCtrl', function($scope, SessionFactory) {
    $scope.currentUser = SessionFactory.checkSession() ? SessionFactory.getSession() : null;


  })


.controller('PayCtrl', function($scope, ContactsService) {

    console.log('payctrl loads')
    $scope.selectedContact = { phone:''};

    $scope.pickContact = pickContact;

    /////

    function pickContact(){
      ContactsService.pickContact().then(
        function(contact) {
          $scope.selectedContact = contact;
          console.log("Selected contacts=");
          console.log($scope.selectedContact);

        },
        function(failure) {
          console.log("Bummer.  Failed to pick a contact");
        }
      );

    }

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, SessionFactory, $state) {

    $scope.user = SessionFactory.checkSession() ? SessionFactory.getSession() : null;

    $scope.user.balance = 0.15;

    $scope.signOut = signOut;

    console.log($scope.user);

    ////////

    function signOut(){
      SessionFactory.deleteSession();
      $state.go('tab.dash');

    }
  })

.controller('HistoryCtrl', function($scope) {


});
