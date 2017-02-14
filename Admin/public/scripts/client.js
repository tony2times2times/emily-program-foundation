console.log("JS");

var emilyApp = angular.module('emilyApp', ["textAngular", "ngRoute", "ngDragDrop", "ui.toggle"]);

// emilyApp.config(function($provide){
//   $provide.decorator("taOptions", ["$delegate", function(taOptions){
//     taOptions.toolbar = [
//       ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'quote'],
//       ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
//       ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
//       ['html', 'insertImage', 'insertLink', 'insertVideo']
//     ];
//   }]);
// });

//handle angular routing within the application
emilyApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/allVolunteers", {
    templateUrl: '../views/partials/allVolunteers.html',
    controller: 'AllVolunteersController'
  })
  .when("/applicants", {
    templateUrl: '../views/partials/applicants.html',
    controller: 'ApplicantsController'
  })
  .when("/emailTemplates", {
   templateUrl: '../views/partials/emailTemplates.html',
   controller: 'EmailDraftsController'
  })
  .when("/adminView", {
    templateUrl: '../views/partials/adminView.html',
    controller: 'AdminViewController'
  })
  .otherwise({
    redirectTo: "/allVolunteers"
  });
}]);
