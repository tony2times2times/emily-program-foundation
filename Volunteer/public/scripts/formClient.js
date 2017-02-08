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

myForm.controller('EssayController', ['$scope', '$http', '$window', '$location', 'formFactory', function($scope, $http, $location, $window, formFactory){
  //previous button
  $scope.essayPrev = function(){
    window.location ='#!/volInfo';
  };
  //next button
  $scope.essayNext = function(){
    window.location = '#!/interestSkills';
  };
  $scope.ff = formFactory;
}]); //end EssayController

myForm.controller('FormController', ['$scope', '$http', function($scope, $http){
  console.log('ng sourced');
}]); //end FormController

myForm.controller('ReferencesController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window, formFactory){
  //previous button
  $scope.refPrev = function(){
    window.location ='#!/interestSkills';
  };
  //next button
  $scope.refNext = function(){
    window.location ='#!/waiver';
  };

  $scope.ff = formFactory;
}]);

myForm.controller('ReqsController',['$scope', '$http','$location', '$window', function($scope, $http, $location, $window){
    //begin application button
    $scope.beginApp = function(){
    window.location ='#!/volInfo';
  };
}]);//end ReqsController

myForm.controller('SkillsController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window, formFactory){
  $scope.skillsIn = formFactory.skillsIn;
  $scope.skills = [ { skill: 'Project_Management'} , { skill: 'Social_Media_Use'} , { skill: 'Language_Skills'} , { skill: 'Lobbying'} , { skill: 'Artwork/Photography'} , { skill:'Public_Speaking'} , { skill: 'Crafts/Scrapbooking'} , { skill: 'Video_Taping/Editing'} , { skill: 'Event_Planning'} , { skill: 'Layout/Graphic_Design'} , { skill: 'Writing'} , { skill: 'Marketing'} , { skill: 'Fundraising'} ];
  $scope.interests = [];
  //previous button
  $scope.skillsPrev = function(){
    window.location ='#!/essayQues';
  };
  //next button
  $scope.skillsNext = function(){
    console.log('skillsIn', $scope.skillsIn);
    window.location ='#!/references';
  };


}]);

myForm.controller('VolInfoController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window,formFactory){
  //next button function
  $scope.infoPrev = function(){
    window.location = '#!/volReqs';
  };
  //previous button function
  $scope.infoNext = function(){
    // sendDataToFactory();
    window.location = '#!/essayQues';
  };
    $scope.ff = formFactory;
    // $scope.lastName = formFactory.lastName;
  // var sendDataToFactory = function(){
  //   console.log('sending to factory', $scope.firstName);
  //    formFactory.firstname = $scope.firstName;
  //    formFactory.lastName = $scope.lastName;
  //
  // };//end sendDataToFactory()
}]);//endVolInfoController


myForm.controller('WaiverController', ['$scope', '$http', function($scope, $http){
  //previous button
  $scope.wavPrev = function(){
    window.location ='#!/references';
  };
}]);
