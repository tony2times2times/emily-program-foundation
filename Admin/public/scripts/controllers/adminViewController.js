emilyApp.controller('AdminViewController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("AdminViewController loaded.");

  var getAdmins = function() {
    $http.get('/private/alladmins')
      .then(function(response){
        console.log('Response: ', response);
        $scope.adminArray = response.data;
      });
    console.log($scope.adminArray);
  };

  $scope.removeAdmin = function(index) {
    var removalHTTP = '/private/deleteadmin/' +  $scope.adminArray[index].googleEmail;
    $http.delete(removalHTTP).then(getAdmins);
  };

  $scope.addAdmin = function() {
    var addHTTP = '/private/addadmin/' + $scope.inputEmail;
    $http.post(addHTTP).then(getAdmins);
  };

  getAdmins();
}]);
