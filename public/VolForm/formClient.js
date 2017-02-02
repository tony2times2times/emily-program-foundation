console.log('js sourced');

var myForm = angular.module('myForm',[]);

myForm.controller('FormController', ['$scope', '$http', function($scope, $http){
  console.log('ng sourced');
}]); //end FormController
