emilyApp.controller('AllVolunteersController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("AllVolunteersController loaded.");

  $scope.init = function(){
    $scope.hideAddVolunteer = true;
    $scope.skillsIn = {};
    $scope.interestsIn = {};
    $scope.selectedindex = null;
    $scope.expandAll = false;

    $scope.getFormFields();
    $scope.getAllVolunteers();
  };// end init()

  $scope.switchExpandView = function(){
    console.log('expanding | expandAll = ', $scope.expandAll);
    $scope.expandAll = !($scope.expandAll);
    console.log('again afterwards | expandAll = ', $scope.expandAll);
  }; // end switchExpandView()

  $scope.clickedVolunteer = function(index){
    console.log('expanding to show more info | index = ', index);
    if($scope.selectedindex === index) return $scope.selectedindex = null;
    $scope.selectedindex = index;
  };//end clickedVolunteer()

  $scope.getAllVolunteers = function(){
    console.log('Getting all of the volunteers');

    $http({
      method: 'GET',
      url: '/volunteer'
    }).then(function(response){
      console.log(response.data);

      $scope.volunteers = response.data;
    }); // end http
  }// getAllVolunteers()


  $scope.getFormFields = function(){
    console.log("Getting feilds for form");

    $http({
      method: 'GET',
      url: '/formFields'
    }).then(function(response){
      console.log('response', response);

      $scope.allSkills = response.data.skills;
      $scope.allInterests = response.data.interests;
      $scope.allQuestions = response.data.essayQuestions;
    });//end http
  };// end getFormFields()

  var onlyTrueToArray = function( object ){
    var array = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key]) array.push(key);
      }
    }
    return array;
  }; // end onlyTrueToArray()

  $scope.submitNewVolunteer = function(){
    console.log('submitting new volunteer');
    $scope.hideAddVolunteer = true;

    var sendData = {

      street: $scope.streetIn,
      city: $scope.cityIn,
      state: $scope.stateIn,
      zip: $scope.zipIn,
      email: $scope.emailIn,
      phoneNum: $scope.phoneNumIn,
      dateBegan: $scope.dateBeganIn,
      dateOfBirth: $scope.dateOfBirthIn,
      emergancyName: $scope.emergencyNameIn,
      emergancyPhone: $scope.emergencyPhoneIn,
      employment: $scope.employmentIn,
      intersts: onlyTrueToArray( $scope.interestsIn ),
      firstName: $scope.firstNameIn,
      lastName: $scope.lastNameIn,
      notes: $scope.notesIn,
      skills: onlyTrueToArray( $scope.skillsIn )
    };// end sendData

    console.log('Data to Send = ', sendData);
    $http({
      method: 'POST',
      url: '/volunteer',
      data: sendData
    }).then(function(response){
      console.log(response);
      $scope.getAllVolunteers();
    });//end http
  };// end submitNewVolunteer()

}]); // end controller
