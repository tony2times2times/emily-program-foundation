emilyApp.controller('EmailTemplateController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("emailTemplateController loaded.");

  var getEmailTemplates = function() {
    $http.get('/private/emailTemplate')
      .then(function(response){
        console.log('Response: ', response);
        $scope.emailTemplateArray = response.data;
      });
  };

  $scope.modifyTemplate = function(id){
    getEmailTemplates();
  };

  $scope.removeTemplate = function(id){
    getEmailTemplates();
  };

  $scope.createTemplate = function(){
    getEmailTemplates();
  };

  getEmailTemplates();
}]);
