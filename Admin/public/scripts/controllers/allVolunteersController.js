emilyApp.controller('AllVolunteersController', ["$scope", "$http", "SweetFactory",
function($scope, $http, SweetFactory) {

  $scope.init = function(){
    $scope.hideAddVolunteer = true;
    $scope.hideEditVolunteer = true;
    $scope.skillsIn = {};
    $scope.interestsIn = {};
    $scope.skillsSearchOpt = {};
    $scope.interestsSearchOpt = {};
    $scope.selectedindex = null;
    $scope.expandAll = false;
    $scope.selectedCheckbox = {};
    $scope.sortBy = 'nameDownSort';
    $scope.expandSearchOpt = false;


    $scope.getFormFields();
    $scope.getAllVolunteers();
  };// end init()


 //--------- BELLOW WAS CODE THAT I FOUND THAT I FOUND INTERESTING FOR REMOVING MALICIOUS CODE
  //   var searchVal = $scope.seachFor;
  //   searchVal = searchVal.replace(/([()[{*+.$^\\|?])/g, '\\$1'); //special char
  //
  //   console.log('searchVal = ', searchVal);
  //

  $scope.sortVolunteers = function(sortIn){
    var v = 1;
    switch (sortIn) {
      case 'name':

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

        if ($scope.sortBy === "interestDownSort") v = -1;
        var x = 0;

        $scope.volunteers.sort(function(a, b){
          if(a.interests[0] < b.interests[0]) return -v;
          if(a.interests[0] > b.interests[0]) return v;
          return 0;
        });

        $scope.sortBy = "interestDownSort";
        if (v === -1) $scope.sortBy = "interestUpSort";

        break;
      default:
    } // end switch

    $scope.filterThroughVolunteers();
  };// end sortVolunteers

  $scope.filterThroughVolunteers = function(){
    $scope.selectedCheckbox = {};
    $scope.filteredVolunteers = $scope.volunteers;

    //filter name search
    $scope.searchedName = $scope.nameSearch;
    $scope.filteredVolunteers = $scope.filteredVolunteers.filter(function(x) {
      var re = new RegExp(  $scope.searchedName, "i"  );
      var searchField = x.name.first_name + ' ' + x.name.last_name;
      return ( searchField.match(re) ? true : false );
    });// end filter

    //filter interests search
    $scope.searchedInterests = onlyTrueToArray($scope.interestsSearchOpt);
    for (var i = 0; i < $scope.searchedInterests.length; i++) {
      $scope.filteredVolunteers = $scope.filteredVolunteers.filter(function(x) {
        for (var ii = 0; ii < x.interests.length; ii++) {
          if ($scope.searchedInterests[i] === x.interests[ii] ) return true;
        } // end nested for
        return false;
      });// end filter
    }// end for

    //filter skills search
    $scope.searchedSkills = onlyTrueToArray($scope.skillsSearchOpt);
    for (var i = 0; i < $scope.searchedSkills.length; i++) {
      $scope.filteredVolunteers = $scope.filteredVolunteers.filter(function(x) {
        for (var ii = 0; ii < x.skills.length; ii++) {
          if ($scope.searchedSkills[i] === x.skills[ii] ) return true;
        } // end nested for
        return false;
      });// end filter
    } // end for

  };// end filterThroughVolunteers()

  $scope.cancelSearchResults = function(){
      $scope.showSearchResults = false;
      $scope.filteredVolunteers = $scope.volunteers;
      $scope.skillsSearchOpt = {};
      $scope.interestsSearchOpt = {};
      $scope.nameSearch = '';
      $scope.selectedindex = null;
      $scope.selectedCheckbox = {};
  }; //end cancelSearchResults()

  $scope.showExtraInfo = function(name , id){

    $http({
      method: 'GET',
      url: '/volunteer/extraInfo/' + id
    }).then(function(response){
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
        showCancelButton: false,
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

      swal.queue(steps).then(function () {
        swal.resetDefaults();
      }); // end sweetAlert
    }); // end http
  };// end showExtraInfo()

  $scope.editVolunteer = function( volunteer ){
    $scope.hideAddVolunteer = true;
    $scope.hideEditVolunteer = false;
    $scope.addEditVolunteer = volunteer;

    $scope.addEditVolunteer.availibleInterests = [];
    $scope.addEditVolunteer.availibleSkills = [];

    // for interests: remove all interests from allInterests that are not already interests to availibleInterests
    interests:
    for (var i = 0; i < $scope.allInterests.length; i++) {
      for (var ii = 0; ii < $scope.addEditVolunteer.interests.length; ii++) {
        if($scope.addEditVolunteer.interests[ii] === $scope.allInterests[i]){
          continue interests;
        } // end if
      } // end nested for
      $scope.addEditVolunteer.availibleInterests.push( $scope.allInterests[i] );
    } // end for
    // for skills: adding all skills from allSkills that are not already skills to availableSkills
    skills:
    for (var i = 0; i < $scope.allSkills.length; i++) {
      for (var ii = 0; ii < $scope.addEditVolunteer.skills.length; ii++) {
        if($scope.addEditVolunteer.skills[ii] === $scope.allSkills[i]){
          continue skills;
        } // end if
      }// end nested for
     $scope.addEditVolunteer.availibleSkills.push( $scope.allSkills[i] );
    }// end for
  };//end editVolunteer()

  $scope.addSkill = function(skill){
    //add skill to active applicant user based on the selected skill
    //prevent blank skill from being added.
    if (typeof skill !== 'string') {
      return;
    }
    //add the skill to the applicants skills list
    $scope.addEditVolunteer.skills.push(skill);
    //search the applicants availibleSkills
    for (var i = 0; i < $scope.addEditVolunteer.availibleSkills.length; i++) {
      //when the skill is found remove it from availibleSkills
      if ($scope.addEditVolunteer.availibleSkills[i] === skill) {
        $scope.addEditVolunteer.availibleSkills.splice(i, 1);
        break;
      }
    }
  };

  $scope.removeSkill = function(index){
    //removes skill from active applicant
    //add skill to list availibleSkills
    $scope.addEditVolunteer.availibleSkills.push($scope.addEditVolunteer.skills[index]);
    //remove skill from applicant
    $scope.addEditVolunteer.skills.splice(index,1);
  };

  $scope.addInterest = function(interest){
    //add interst based on the selected interest
    //prevent blank interests from being selected
    if (typeof interest !== 'string') {
      return;
    }
    //adds interest to applicants interests list
    $scope.addEditVolunteer.interests.push(interest);
    //search the applicants availibleInterests
    for (var i = 0; i < $scope.addEditVolunteer.availibleInterests.length; i++) {
      //find the interest and remove it from availibleInterests
      if ($scope.addEditVolunteer.availibleInterests[i] === interest) {
        $scope.addEditVolunteer.availibleInterests.splice(i, 1);
        break;
      }
    }
  };

  $scope.removeInterest = function(index){
    //add interest to the applicants availibleInterests
    $scope.addEditVolunteer.availibleInterests.push($scope.addEditVolunteer.interests[index]);
    //remove interest from applicants interests
    $scope.addEditVolunteer.interests.splice(index, 1);
  };

  $scope.updateVolunteer = function( volunteer ){

    $http({
      method: 'PUT',
      url: '/volunteer/' + volunteer._id,
      data: volunteer
    }).then(function successCallback(response) {


      $scope.hideEditVolunteer = true;
      swal(
        'Edit Saved',
        '',
        'success'
      );
      $scope.getAllVolunteers();

    }, function errorCallback(error) {

    });
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

      $scope.cancelSearchResults();
      $scope.getAllVolunteers();
      $scope.expandAll = false;
    }); //end http
  };// end removeAllData()

  $scope.switchExpandView = function(){

    $scope.expandAll = !($scope.expandAll);

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


    $http({
      method: 'GET',
      url: '/volunteer'
    }).then(function(response){
      // console.log(response.data);
      $scope.filteredVolunteers = $scope.volunteers = response.data;
      $scope.selectedindex = null;
      $scope.sortBy = 'nameDownSort';
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
    // console.log("Getting feilds for form");

    $http({
      method: 'GET',
      url: '/formFields'
    }).then(function(response){
      $scope.allSkills = [];
      $scope.allInterests = [];
      // for Skills: converts an array of objects to an array of strings
      for (var i = 0; i < response.data.skills.length; i++) {
        $scope.allSkills.push(response.data.skills[i].skill);
      } // end for
      // for Interests: converts an array of objects to an array of strings
      for (var i = 0; i < response.data.interests.length; i++) {
        $scope.allInterests.push(response.data.interests[i].interest);
      } // end for
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
    // console.log('submitting new volunteer');
    $scope.hideAddVolunteer = true;

    $scope.addEditVolunteer.interests = onlyTrueToArray( $scope.interestsIn );
    $scope.addEditVolunteer.skills = onlyTrueToArray( $scope.skillsIn );

    // console.log('Data to Send = ', $scope.addEditVolunteer);
    $http({
      method: 'POST',
      url: '/volunteer',
      data: $scope.addEditVolunteer
    }).then(function(response){
      // console.log(response);
      $scope.getAllVolunteers();
    });//end http
  };// end submitNewVolunteer()

}]); // end controller
