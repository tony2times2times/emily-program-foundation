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
    templateUrl: '../views/partials/references.html',
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
    redirectTo: 'volReqs'
  });
}]); //end routeProvider

myForm.controller('EssayController', ['$scope', '$http', function($scope, $http){

}]); //end EssayController

myForm.controller('FormController', ['$scope', '$http', function($scope, $http){
  console.log('ng sourced');
}]); //end FormController

myForm.controller('ReferencesController', ['$scope', '$http', function($scope, $http){

}]);

myForm.controller('ReqsController',['$scope', '$http', function($scope, $http){

}]);//end ReqsController

myForm.controller('SkillsController', ['$scope', '$http', function($scope, $http){

}]);

myForm.controller('VolInfoController', ['$scope', '$http', function($scope, $http){

}]);//endVolInfoController

myForm.controller('WaiverController', ['$scope', '$http', function($scope, $http){

}]);
