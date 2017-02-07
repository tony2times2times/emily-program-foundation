emilyApp.factory('AuthFactory', function ($http) {
  var Status = {};
  Status.loggedIn = false;

  // The public API:
  Status.checkLoggedIn = function() {
    return Status.loggedIn;
  };
  Status.isLoggedIn = function() {
    return $http.get('/auth');
  };
  Status.setLoggedIn = function(value) {
    Status.loggedIn = value;
  };
  Status.logout = function() {
    return $http.get('/auth/logout');
  };
  return Status;
});
