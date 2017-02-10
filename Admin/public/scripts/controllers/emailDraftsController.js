emilyApp.controller('EmailDraftsController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("emailDraftsController loaded.");
  $scope.saveEmailTemplate = function(){
  var emailTemplateInputs = {
    body: $scope.body,
    name: $scope.name,
    subject: $scope.subject
  };
  console.log('in saveEmailTemplate', emailTemplateInputs);
  $http({
    method: 'POST',
    url: '/emailTemplate',
    data: emailTemplateInputs
  }).then(function (response){
    console.log('Post response', response);
  }); // end $http post call
  }; // end saveEmailTemplate function
}]); // end EmailDraftsController
