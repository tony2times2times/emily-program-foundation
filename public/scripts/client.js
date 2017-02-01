console.log("JS");

var emilyApp = angular.module('emilyApp', ["ngRoute"]);

//handle angular routing within the application
emilyApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/logIn", {
    templateUrl: '../views/logIn.html',
    controller: 'logInController'
  })
  .when("/allVolunteers", {
    templateUrl: '../views/allVolunteers.html',
    controller: 'allVolunteersController'
  })
  .when("/applicants", {
    templateUrl: '../views/applicants.html',
    controller: 'applicantsController'
  })
  .when("/emailDrafts", {
    templateUrl: '../views/emailDrafts.html',
    controller: 'emailDraftsController'
  })
  .otherwise({
    redirectTo: "/logIn"
  });
}]);
