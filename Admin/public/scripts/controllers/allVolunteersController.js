emilyApp.controller('AllVolunteersController', ["$scope", "$http", "SweetFactory",
function($scope, $http, SweetFactory) {
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
    $scope.selectedCheckbox = {};


    $scope.getFormFields();
    $scope.getAllVolunteers();
  };// end init()


 // BELLOW WAS CODE THAT I FOUND THAT I FOUND INTERESTING FOR REMOVING MALICIOUS CODE
  //   var searchVal = $scope.seachFor;
  //   searchVal = searchVal.replace(/([()[{*+.$^\\|?])/g, '\\$1'); //special char
  //
  //   console.log('searchVal = ', searchVal);
  //


  $scope.filterThroughVolunteers = function(){
    if (!($scope.searchFor))return $scope.filteredVolunteers = $scope.volunteers;
    $scope.selectedCheckbox = {};
    $scope.searchedInquiry = $scope.searchFor;
    $scope.searchedInquiryBy = $scope.searchBy;
    $scope.showSearchResults = true;
    switch ($scope.searchBy) {
      case 'names':
        $scope.filteredVolunteers = $scope.volunteers.filter(function(x) {
          var re = new RegExp(  $scope.searchFor, "i"  );
          var searchField = x.name.first_name + ' ' + x.name.last_name;
          return ( searchField.match(re) ? true : false );
        });// end filter

        break;

      case 'skills':
        console.log('filter by skill??', $scope.volunteers);
        $scope.filteredVolunteers = $scope.volunteers.filter(function(x) {
          var re = new RegExp($scope.searchFor, "i" );
          var searchField = '';
          for (var i = 0; i < x.skills.length; i++) {
            searchField += ' ' + x.skills[i]
          }
          return ( searchField.match(re) ? true : false );
        });// end filter
        break;

      case 'interests':
        console.log('filter by interests??');
        $scope.filteredVolunteers = $scope.volunteers.filter(function(x) {
          var re = new RegExp($scope.searchFor, "i" );
          var searchField = '';
          for (var i = 0; i < x.interests.length; i++) {
            searchField += ' ' + x.interests[i];
          }
          return ( searchField.match(re) ? true : false );
        });// end filter
        break;

      default:
      console.log('didnt filter');
      $scope.filteredVolunteers = $scope.volunteers;
    }// end switch
  };// end filterThroughVolunteers()

  $scope.cancelSearchResults = function(){
      $scope.showSearchResults = false;
      $scope.filteredVolunteers = $scope.volunteers;
      $scope.searchFor = '';
  }; //end cancelSearchResults()

  $scope.updateVolunteerNotes = function( volunteer, index ){
    console.log('updating note | volunteer & index = ', volunteer, index );
    console.log('this should be the new note -> ', $scope.notes[index]);
  }// end updateVolunteerNotes()

  $scope.switchExpandView = function(){
    console.log('expanding | expandAll = ', $scope.expandAll);
    $scope.expandAll = !($scope.expandAll);
    console.log('again afterwards | expandAll = ', $scope.expandAll);
  }; // end switchExpandView()


  $scope.checkAll = function(){
    var numberChecked = 0;
    //search every person in the hat array
    for (var key in $scope.selectedCheckbox) {
      //count # of previously checked boxes
      if ($scope.selectedCheckbox[key]) numberChecked++
    }
    // if all are checked by seeing if checked # = total volun #
    if ( numberChecked === $scope.filteredVolunteers.length ) {
        // if all un check all
        $scope.selectedCheckbox = {};
    } else {
      // if not all, make all checked by iterating through and creating true values for all indexes
      for (var i = 0; i < $scope.filteredVolunteers.length; i++) {
        $scope.selectedCheckbox[i] = true;
      }
    }
  }; // end checkAll()

  $scope.clickedVolunteer = function(index){
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

  $scope.mailAllChecked = function(){
    var recipientArray = [];
    for (var index in $scope.selectedCheckbox) {
      if ($scope.selectedCheckbox) {
        recipientArray.push($scope.filteredVolunteers[index]);
      }
    }
    SweetFactory.emailSend(SweetFactory.emailStrip(recipientArray));
  };

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

emilyApp.filter('dateFormate', function(){
   return function(input){
     if (!input)return;
     var x = 5
     if (input.slice(5,6)==='0' )x=6;
     return input.slice(x,10) + '-' + input.slice(0,4);
    };
  });

emilyApp.filter('phoneNumFormate', function(){
   return function(input){
     if (!input)return;
     var input = input.toString()
     return '(' + input.slice(0,3) + ') ' + input.slice(3,6) + '-' + input.slice(6);
    };
  });
