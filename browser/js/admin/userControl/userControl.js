app.config(function ($stateProvider) {

    $stateProvider.state('users', {
        url: '/users',
        controller: 'UserController',
        templateUrl: 'js/admin/userControl/templates/userControl.html',
        resolve: {
          allUsers: function(UserFactory) {
            return UserFactory.fetchAll();
          }
        }
    });
});


app.controller('UserController', function ($scope, allUsers, UserFactory) {
  $scope.users = allUsers;

  $scope.toggleAdmin = function(userId, adminStatus, index) {
    UserFactory.changeAdmin(userId, !adminStatus)
      .then(() => {
        $scope.users[index].isAdmin = !adminStatus;
      })
      .catch(console.error);
  }

  $scope.deleteUser = function(userId, index) {
    UserFactory.delete(userId)
    .then(function () {
      $scope.users.splice(index, 1);
    })
    .catch(console.error);
  }

  $scope.togglePassword = function(userId) {
    UserFactory.changePassword(userId)
      .then()
      .catch(console.error);
  }

});
