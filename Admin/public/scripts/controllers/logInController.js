emilyApp.controller('LoginController', ["AuthFactory", "$scope",
function (AuthFactory, $scope) {
  $scope.loggedIn = AuthFactory.checkLoggedIn(); // NOTE: only updated on page load
}]);
