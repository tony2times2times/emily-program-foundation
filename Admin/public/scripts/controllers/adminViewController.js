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

  var getSkills = function() {
    $http.get('/private/allskills')
      .then(function(response){
        console.log('Response: ', response);
        $scope.skillArray = response.data;
      });
    console.log($scope.skillArray);
  };

  $scope.addSkill = function() {
    var addHTTP = '/private/addskill/' + encodeURIComponent($scope.inputSkill);
    $http.post(addHTTP).then(getSkills);
  };

  $scope.switchSkill = function(index) {
    var switchHTTP = '/private/switchskill/' + encodeURIComponent($scope.skillArray[index].skill) + '/' + $scope.skillArray[index].used;
    console.log("Attempting switchSkill. HTTP PUT call: ", switchHTTP);
    $http.put(switchHTTP).then(getSkills);
  };

  var getInterests = function() {
    $http.get('/private/allinterests')
      .then(function(response){
        console.log('Response: ', response);
        $scope.interestArray = response.data;
      });
    console.log($scope.interestArray);
  };

  $scope.addInterest = function() {
    var addHTTP = '/private/addinterest/' + encodeURIComponent($scope.inputInterest);
    $http.post(addHTTP).then(getInterests);
  };

  $scope.switchInterest = function(index) {
    var switchHTTP = '/private/switchinterest/' + encodeURIComponent($scope.interestArray[index].interest) + '/' + $scope.interestArray[index].used;
    console.log("Attempting switchInterest. HTTP PUT call: ", switchHTTP);
    $http.put(switchHTTP).then(getSkills);
  };

  var getEssayQs = function() {
    $http.get('/private/allessayqs')
      .then(function(response){
        console.log('Response: ', response);
        $scope.essayqArray = response.data;
      });
    console.log($scope.essayqArray);
  };

  $scope.addEssayQs = function() {
    var addHTTP = '/private/addessayq/' + encodeURIComponent($scope.inputEssayQ);
    $http.post(addHTTP).then(getEssayQs);
  };

  getEssayQs();
  getInterests();
  getSkills();
  getAdmins();
}]);
