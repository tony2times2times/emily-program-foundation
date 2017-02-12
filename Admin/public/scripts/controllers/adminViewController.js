emilyApp.controller('AdminViewController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("AdminViewController loaded.");

  var getAdmins = function() {
    $http.get('/private/adminview/alladmins')
      .then(function(response){
        console.log('Response: ', response);
        $scope.adminArray = response.data;
      });
    console.log($scope.adminArray);
  };

  $scope.removeAdmin = function(id) {
    var removalHTTP = '/private/adminview/deleteadmin/' + id;
    $http.delete(removalHTTP).then(getAdmins);
  };

  $scope.addAdmin = function() {
    var addHTTP = '/private/adminview/addadmin/' + $scope.inputEmail;
    $http.post(addHTTP).then(getAdmins);
  };

  var getSkills = function() {
    $http.get('/private/adminview/allskills')
      .then(function(response){
        console.log('Response: ', response);
        $scope.skillArray = response.data;
      });
    console.log($scope.skillArray);
  };

  $scope.addSkill = function() {
    var addHTTP = '/private/adminview/addskill/' + encodeURIComponent($scope.inputSkill);
    $http.post(addHTTP).then(getSkills);
  };

  $scope.switchSkill = function(id, used) {
    var switchHTTP = '/private/adminview/switchskill/' + id + '/' + used;
    console.log("Attempting switchSkill. HTTP PUT call: ", switchHTTP);
    $http.put(switchHTTP).then(getSkills);
  };

  var getInterests = function() {
    $http.get('/private/adminview/allinterests')
      .then(function(response){
        console.log('Response: ', response);
        $scope.interestArray = response.data;
      });
    console.log($scope.interestArray);
  };

  $scope.addInterest = function() {
    var addHTTP = '/private/adminview/addinterest/' + encodeURIComponent($scope.inputInterest);
    $http.post(addHTTP).then(getInterests);
  };

  $scope.switchInterest = function(id, used) {
    var switchHTTP = '/private/adminview/switchinterest/' + id + '/' + used;
    console.log("Attempting switchInterest. HTTP PUT call: ", switchHTTP);
    $http.put(switchHTTP).then(getInterests);
  };

  var getEssayQs = function() {
    $http.get('/private/adminview/allessayqs')
      .then(function(response){
        console.log('Response: ', response);
        $scope.essayqArray = response.data;
      });
    console.log($scope.essayqArray);
  };

  $scope.addEssayQ = function() {
    var addHTTP = '/private/adminview/addessayq/' + encodeURIComponent($scope.inputEssayQ);
    $http.post(addHTTP).then(getEssayQs);
  };

  $scope.switchEssayQ = function(id, used) {
    var switchHTTP = '/private/adminview/switchessayq/' + id + '/' + used;
    console.log("Attempting switchEssayQ. HTTP PUT call: ", switchHTTP);
    $http.put(switchHTTP).then(getEssayQs);
  };

  getEssayQs();
  getInterests();
  getSkills();
  getAdmins();
}]);
