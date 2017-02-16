emilyApp.controller('EmailDraftsController', ["$scope", "$http", 'SweetFactory', 'textAngularManager',
function($scope, $http, SweetFactory, textAngularManager) {
  console.log("emailDraftsController loaded.");

  // Initialize template editor control values:
  $scope.modifyTemplateID = false;
  $scope.newTemplateEntry = false;

  var getEmailTemplates = function(){
    $http.get('/private/emailTemplate').then(function(response){
      console.log('response from mongo', response.data);
      $scope.emailTemplateArray = response.data;
    });
  };

  var clearNewTemplateEntries = function(){
    $scope.newTemplateName = '';
    $scope.newTemplateSubject = '';
    $scope.newTemplateBody = '';
  };

  $scope.removeTemplateButton =
    function(id){
    var deleteHTTP = '/private/emailTemplate/' + id;
    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }).then(function(){
      $http.delete(deleteHTTP).then(getEmailTemplates);
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
  };

  $scope.modifyTemplateButton = function(id){
    $scope.modifyTemplateID = id;
    $scope.newTemplateEntry = false;
  };

  $scope.saveTemplate = function(id, subject, body){
    var putHTTP = '/private/emailTemplate/' + id;
    var templateUpdates = {
      subject: subject,
      body: body
    };
    $http.put(putHTTP, templateUpdates).then(getEmailTemplates);
    $scope.modifyTemplateID = false;
  };

  $scope.cancelTemplate = function(){
    $scope.modifyTemplateID = false;
    getEmailTemplates();
  };

  $scope.createNewTemplateButton = function(){
    $scope.newTemplateEntry = true;
    $scope.modifyTemplateID = false;
  };

  $scope.saveNewTemplate = function(){
    var newTemplate = {
      name: $scope.newTemplateName,
      subject: $scope.newTemplateSubject,
      body: $scope.newTemplateBody
    };
    $http.post('/private/emailTemplate/', newTemplate).then(getEmailTemplates);
    $scope.newTemplateEntry = false;
    swal("Template Saved!", "Thank you!", "success");
    clearNewTemplateEntries();
  };

  $scope.cancelNewTemplate = function(){
    $scope.newTemplateEntry = false;
    clearNewTemplateEntries();
  };

  $scope.sendAndyEmail = function(){
    var andyArray =
    [
      {name:        {
                      first_name: 'Andy',
                      last_name: 'Taton'
                    },
      contactInfo:  {
                      email: 'thomas.andrew.taton@gmail.com'
                    }
      }
    ];
    SweetFactory.emailSend(andyArray);
  };

  clearNewTemplateEntries();
  getEmailTemplates();
}]); // end EmailDraftsController
