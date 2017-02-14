emilyApp.controller('AllVolunteersController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("AllVolunteersController loaded.");

  $scope.getFormFields = function(){
    console.log("Getting feilds for form");

    $http({
      method: 'GET',
      url: '/formFields'
    }).then(function(response){
      console.log('response', response);

      $scope.allSkills = response.data.skills;
      $scope.allInterests = response.data.interests;
      $scope.allQuestions = response.data.essayQuestions;
    });//end http
  };// end getFormFields()

}]);
