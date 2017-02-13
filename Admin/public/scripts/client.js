console.log("JS");

var emilyApp = angular.module('emilyApp', ["textAngular", "ngRoute", "ngDragDrop", "ui.toggle"]);

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
