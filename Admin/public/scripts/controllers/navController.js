emilyApp.controller('NavController', ["$scope", "$http", "$window", "VolunteerFactory", "AuthFactory",
function($scope, $http, $window, VolunteerFactory, AuthFactory) {
  console.log("NavController loaded.");
  $scope.displayLogout = false; // should we display the logout option on the DOM?
  $scope.message = {
    text: false,
    type: 'info',
  };

  AuthFactory.isLoggedIn()
  .then(function (response) {
    // On success:
    if (response.data.status) {
      $scope.displayLogout = true;
      AuthFactory.setLoggedIn(true);
      $scope.username = response.data.name;
    } else { // is not logged in on server
      $scope.displayLogout = false;
      AuthFactory.setLoggedIn(false);
    }
  },
  // On error:
  function () {
    $scope.message.text = 'Unable to properly authenticate user';
    $scope.message.type = 'error';
  });

  $scope.logout = function () {
    AuthFactory.logout()
      .then(function (response) { // success
        AuthFactory.setLoggedIn(false);
        $scope.username = '';
        $window.location.href = '/auth'; // forces a page reload which will update our NavController
      },
      function (response) { // error
        $scope.message.text = 'Unable to logout';
        $scope.message.type = 'error';
      }); // end then
  }; // end logout()

}]);
