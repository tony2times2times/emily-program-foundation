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

myForm.controller('EssayController', ['$scope', '$http', '$window', '$location', function($scope, $http, $location, $window){
  //previous button
  $scope.essayPrev = function(){
    window.location ='form#!/volInfo';
  };
  //next button
  $scope.essayNext = function(){
    window.location = 'form#!/interestSkills';
  };
}]); //end EssayController

myForm.controller('FormController', ['$scope', '$http', function($scope, $http){
  console.log('ng sourced');
}]); //end FormController

myForm.controller('ReferencesController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
  //previous button
  $scope.refPrev = function(){
    window.location ='form#!/interestSkills';
  };
  //next button
  $scope.refNext = function(){
    window.location ='form#!/waiver';
  };
}]);

myForm.controller('ReqsController',['$scope', '$http','$location', '$window', function($scope, $http, $location, $window){
    //begin application button
    $scope.beginApp = function(){
    window.location ='form#!/volInfo';
  };
}]);//end ReqsController

myForm.controller('SkillsController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
  //previous button
  $scope.skillsPrev = function(){
    window.location ='form#!/essayQues';
  };
  //next button
  $scope.skillsNext = function(){
    window.location ='form#!/references';
  };
}]);

myForm.controller('VolInfoController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window,formFactory){
  //next button function
  $scope.infoPrev = function(){
    window.location = 'form#!/volReqs';
  };
  //previous button function
  $scope.infoNext = function(){
    sendDataToFactory();
    window.location = 'form#!/essayQues';
  };

  $scope.getFromFactory = function(){
    console.log('here?');
    $scope.firstName = formFactory.firstname;

  };//end getFromFactory()

  var sendDataToFactory = function(){
    console.log('sending to factory', $scope.firstName);
     formFactory.firstname = $scope.firstName;

  };//end sendDataToFactory()

  $scope.getFromFactory();
  console.log('firstname: ', formFactory.firstname);
}]);//endVolInfoController


myForm.controller('WaiverController', ['$scope', '$http', function($scope, $http){
  //previous button
  $scope.wavPrev = function(){
    window.location ='form#!/references';
  };
}]);
