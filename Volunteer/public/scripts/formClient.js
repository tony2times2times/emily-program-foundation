console.log('js sourced');

var myForm = angular.module('myForm',['ngRoute']);

myForm.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/volInfo', {
    templateUrl: '../views/partials/volInfo.html',
    controller: 'VolInfoController'
  })
  .when('/essayQues', {
    templateUrl: '../views/partials/essayQues.html',
    controller: 'EssayController'
  })
  .when('/interestSkills', {
    templateUrl: '../views/partials/interestSkills.html',
    controller: 'SkillsController'
  })
  .when('/references', {
    templateUrl: '../views/partialsreferences.html',
    controller: 'ReferencesController'
  })
  .when('/waiver', {
    templateUrl: '../views/partials/waiver.html',
    controller: 'WaiverController'
  })
  .when('/volReqs', {
    templateUrl: '../views/partials/volReqs.html',
    controller: 'ReqsController'
  })
  .otherwise({
    redirectTo: 'form'
  });
}]); //end routeProvider

myForm.controller('FormController', ['$scope', '$http', function($scope, $http){
  console.log('ng sourced');
}]); //end FormController

myForm.controller('VolInfoController', ['$scope', '$http', function($scope, $http){

}]);//endVolInfoController
