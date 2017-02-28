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
    $scope.sortBy = 'nameDownSort';


    $scope.getFormFields();
    $scope.getAllVolunteers();
  };// end init()


 // BELLOW WAS CODE THAT I FOUND THAT I FOUND INTERESTING FOR REMOVING MALICIOUS CODE
  //   var searchVal = $scope.seachFor;
  //   searchVal = searchVal.replace(/([()[{*+.$^\\|?])/g, '\\$1'); //special char
  //
  //   console.log('searchVal = ', searchVal);
  //

  $scope.sortVolunteers = function(sortIn){
    console.log('sorting volunteers | by', sortIn);
    var v = 1;
    switch (sortIn) {
      case 'name':
        console.log('hello from name');

        if ($scope.sortBy === "nameDownSort") v = -1;
        // puts volunteers in alphabetical order
        $scope.volunteers.sort(function(a, b){
          if(a.name.last_name < b.name.last_name) return -v;
          if(a.name.last_name > b.name.last_name) return v;
          return 0;
        });

        $scope.sortBy = "nameDownSort";
        if (v === -1) $scope.sortBy = "nameUpSort";

        break;
      case 'interest':
        console.log('hello from interest');

        if ($scope.sortBy === "interestDownSort") v = -1;
        // puts volunteers in alphabetical order

        $scope.volunteers.sort(function(a, b){
          // console.log('sorting this: ', a.interests[0]);
          if(a.interests[0] < b.interests[0]) return -v;
          if(a.interests[0] > b.interests[0]) return v;
          return 0;
        });

        $scope.sortBy = "interestDownSort";
        if (v === -1) $scope.sortBy = "interestUpSort";


        break;
      default:
        console.log('hello from something else');
    }
    $scope.filterThroughVolunteers();

  };// end sortVolunteers

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

  $scope.showExtraInfo = function(name , id){
    console.log('Showing Extra Info | ID: ', id);

    $http({
      method: 'GET',
      url: '/volunteer/extraInfo/' + id
    }).then(function(response){
      console.log(response.data);
      var info = response.data;

      var htmlReferences = '<p><strong>Reference One</strong></p>' +
                        '<p>'+ info.referenceOne.name + '</p>' +
                        '<p>'+ info.referenceOne.phone + '</p>' +
                        '<p>'+ info.referenceOne.email + '</p>' +
                        '<p><strong>Reference Two</strong></p>' +
                        '<p>'+ info.referenceTwo.name + '</p>' +
                        '<p>'+ info.referenceTwo.phone + '</p>' +
                        '<p>'+ info.referenceTwo.email + '</p>';

      var htmlEssayQuestions = '<p><strong>' + info.essayOne.essayQuestion + '</strong></p>' +
                                '<p>'+ info.essayOne.response + '</p>' +
                                '<p><strong>' + info.essayTwo.essayQuestion + '</strong></p>' +
                                '<p>'+ info.essayTwo.response + '</p>';

      var htmlMoreEssayQuestions = '<p><strong>' + info.essayThree.essayQuestion + '</strong></p>' +
                                    '<p>'+ info.essayThree.response + '</p>' +
                                    '<p><strong>' + info.essayFour.essayQuestion + '</strong></p>' +
                                    '<p>'+ info.essayFour.response + '</p>';

      var htmlSupportingMaterial =  '<p><strong>Additional Information</strong></p>' +
                                    '<p>'+ info.additionalInfo + '</p>';

      swal.setDefaults({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
      });

      var steps = [
        {
          title: name + '\'s References',
          html: htmlReferences
        },
        {
          title: name + '\'s Essay Questions',
          html: htmlEssayQuestions
        },
        {
          title: name + '\'s Essay Questions',
          html: htmlMoreEssayQuestions
        },
        {
          title: name + '\'s Supporting Material',
          html: htmlSupportingMaterial
        }
      ];

      swal.queue(steps);
    }); // end http
  };// end showExtraInfo()

  $scope.cancelSearchResults = function(){
      $scope.showSearchResults = false;
      $scope.filteredVolunteers = $scope.volunteers;
      $scope.searchFor = '';
      $scope.selectedindex = null;
      $scope.selectedCheckbox = {};
  }; //end cancelSearchResults()

  $scope.updateVolunteer = function( volunteer ){
    console.log('updating Volunteer | volunteer = ', volunteer );
  }// end updateVolunteer()

  $scope.deleteVolunteer = function( volunteer ){
    swal({
      title: ('THIS CAN NOT BE UNDONE'),
      text: ('Remove ' + volunteer.name.first_name +
      ' ' + volunteer.name.last_name + '? '),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ('Yes, remove ' + volunteer.name.first_name),
      cancelButtonText: ('No, keep ' + volunteer.name.first_name),
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-success',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Deleted!',
        (volunteer.name.first_name +' ' + volunteer.name.last_name +
        ' has been removed.'),
        'error'
      );
      //remove volunteer
      $scope.removeAllData(volunteer);
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Saved!',
          (volunteer.name.first_name +' ' + volunteer.name.last_name +
          ' has been saved.'),
          'success'
        );
      }
    });
  }// end deleteVolunteer()

  $scope.removeAllData = function(volunteer){
    $http({
      method: 'DELETE',
      url: '/volunteer/' + volunteer._id
    }).then(function(response) {
      console.log(response);
      $scope.cancelSearchResults();
      $scope.getAllVolunteers();
      $scope.expandAll = false;
    }); //end http
  };// end removeAllData()

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
      // console.log(response.data);
      $scope.filteredVolunteers = $scope.volunteers = response.data;
      // $scope.filterThroughVolunteers();
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
      interests: onlyTrueToArray( $scope.interestsIn ),
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
