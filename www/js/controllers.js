angular.module('starter.controllers', [])

.controller('DashCtrl', function(AuthFactory) {
    var vm = this;
    vm.signupForm = {};
    vm.submit = submit;


    ///////////

    function submit(){
      AuthFactory.register(vm.signupForm)
        .then(function(){
          console.log('Yay successfully registered ', vm.signupForm.name)

        }, function(){
          console.log('Did not work :/')
        })



    }

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
