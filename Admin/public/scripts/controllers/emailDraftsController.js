emilyApp.controller('EmailDraftsController', ["$scope", "$http", "VolunteerFactory", 'textAngularManager',
function($scope, $http, VolunteerFactory, textAngularManager) {
  console.log("emailDraftsController loaded.");
  $scope.saveEmailTemplate = function(){
  var emailTemplateInputs = {
    body: $scope.body
  };
  console.log('in saveEmailTemplate', emailTemplateInputs);
  $http({
    method: 'POST',
    url: '/private/emailTemplate',
    data: emailTemplateInputs
  }).then(function (response){
    console.log('Post response', response);
    $scope.getEmailTemplate();
  }); // end $http post call
  }; // end saveEmailTemplate function

$scope.getEmailTemplate = function(){
  $http({
    method: 'GET',
    url: '/private/emailTemplate',
  }).then(function(response){
    console.log('response from mongo', response.data);
    $scope.displayEmail = response.data;
  });
}; // end getEmailTemplate function

$scope.deleteEmail = function(index){
$http({
  method: 'DELETE',
  url: '/private/emailTemplate' + $scope.displayEmail[index]._id,
}).then(function(response){
  console.log('delete response', response);
  $scope.getEmailTemplate();
});
}; // end deleteEmail

}]); // end EmailDraftsController
