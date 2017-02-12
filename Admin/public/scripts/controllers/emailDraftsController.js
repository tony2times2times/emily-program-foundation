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
    $scope.getEmailTemplate();
  }); // end $http post call
  }; // end saveEmailTemplate function

$scope.getEmailTemplate = function(){
  $http({
    method: 'GET',
    url: '/emailTemplate',
  }).then(function(response){
    console.log('response from mongo', response.data);
    $scope.displayEmail = response.data;
  });
}; // end getEmailTemplate function

$scope.deleteEmail = function(index){
$http({
  method: 'DELETE',
  url: '/emailTemplate/' + $scope.displayEmail[index]._id,
}).then(function(response){
  console.log('delete response', response);
  $scope.getEmailTemplate();
});
}; // end deleteEmail

}]); // end EmailDraftsController
