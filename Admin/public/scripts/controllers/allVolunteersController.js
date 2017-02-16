emilyApp.controller('AllVolunteersController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("AllVolunteersController loaded.");

  $scope.init = function(){
    $scope.hideAddVolunteer = true;
    $scope.skillsIn = {};
    $scope.interestsIn = {};
    $scope.selectedindex = null;
    $scope.expandAll = false;
    $scope.notes = {}
    $scope.searchBy = 'names';
    $scope.showSearchResults = false;


    $scope.getFormFields();
    $scope.getAllVolunteers();
  };// end init()


  // $scope.searchFilter = function(item){
  //
  //   if (!$scope.search.$ || (!$scope.search.value && !$scope.search.name)) {// your input field is empty or no checkbox checked
  //   return true;
  //   }
  //
  //   var searchVal = $scope.seachFor;
  //   searchVal = searchVal.replace(/([()[{*+.$^\\|?])/g, '\\$1'); //special char
  //
  //   console.log('searchVal = ', searchVal);
  //
  //   var regex = new RegExp('' + searchVal, 'i');
  //
  //   var matchOnValue = false, matchOnName= false;
  //
  //   if ($scope.search.value) {
  //      matchOnValue = regex.test(item.value);
  //   }
  //   if ($scope.search.name) {
  //      matchOnName = regex.test(item.name);
  //   }
  //   return matchOnValue || matchOnName;
  // };// end searchFilter()

  $scope.filterThroughVolunteers = function(){
    if (!($scope.searchFor))return $scope.filteredVolunteers = $scope.volunteers;
    $scope.searchedInquiry = $scope.searchFor
    switch ($scope.searchBy) {
      case 'names':
        $scope.filteredVolunteers = $scope.volunteers.filter(function(x) {
          var re = new RegExp($scope.searchFor);
          var searchFeild = x.name.first_name + ' ' + x.name.last_name;
          return ( searchFeild.match(re) )
        });// end filter


        break;
      case 'skills':
        console.log('filter by skill??');


        break;
      case 'interests':
        console.log('filter by interests??');


        break;
      default:
      console.log('didnt filter');
      $scope.filteredVolunteers = $scope.volunteers;

    }

  $scope.cancelSearchResults = function(){
      $scope.showSearchResults = false;
      $scope.filteredVolunteers = $scope.volunteers;
      $scope.searchFor = '';
  }; //end cancelSearchResults()

  $scope.showSearchResults = true;
    console.log('else');
  };// end filterThroughVolunteers()

  $scope.updateVolunteerNotes = function( volunteer, index ){
    console.log('updating note | volunteer & index = ', volunteer, index );
    console.log('this should be the new note -> ', $scope.notes[index]);
  }// end updateVolunteerNotes()

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
      $scope.filterThroughVolunteers();
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
