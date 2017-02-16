emilyApp.controller('ApplicantsController', ["$scope", "$http","$timeout", "SweetFactory",
function($scope, $http, $timeout, SweetFactory) {

  //global variables
  var init=0;
  $scope.activeView = 'info';
  $scope.selected = {};
  $scope.selected.skill = {};
  $scope.selected.interest = {};
  $scope.person = {};
  $scope.hatList= ['APPLIED','PENDING','SCHEDULED','PROGRAM ERROR!!! CHECK bucketList'];
  $scope.hatchery = [];
  $scope.applied = [];
  $scope.pending = [];
  $scope.scheduled = [];
  $scope.hatchery.push($scope.applied);
  $scope.hatchery.push($scope.pending);
  $scope.hatchery.push($scope.scheduled);
  $scope.skills = [];
  $scope.interests = [];

  //on page load get all aplicants
  $scope.loadApplicants = function(){
    $http({
      method: 'GET',
      url: '/applicant',
    }).then(function successCallback(response) {
      console.log(response);
      //put each applicant in thier appropriate buck
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].appStatus === 'applied') {
          $scope.applied.push(response.data[i]);
        }else if (response.data[i].appStatus === 'pending') {
          $scope.pending.push(response.data[i]);
        }else if (response.data[i].appStatus === 'scheduled') {
          $scope.scheduled.push(response.data[i]);
        }else {
          console.log('unrecognized status for: ' + response.data[i].appStatus);
        }
      }
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //get active skills and interests from the database
  $scope.getFormFields = function(){
    $http({
      method: 'GET',
      url: '/formFields',
      data: {status: $scope.person.appStatus}
    }).then(function successCallback(response) {
      console.log(response);
      //assign the skills and interests to global variables
      $scope.interests = response.data.interests;
      $scope.skills = response.data.skills;
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //Controlls what happens when a object is moved into a array using that array's index
  $scope.incubator = function(index){
    //This is used to prevent posting when webpage is initially loaded
    if (init < $scope.hatchery.length){
      init = init + 1;
      return;
    }
    //if person was moved into the applied array change thier status
    else {if (index === 0) {
      $scope.person.appStatus = 'applied';
      if ($scope.person.numMissedOrientaion>2) {$scope.askToRemove($scope.person);}
    }
    //if person was moved into the pending array change thier status
    else if (index === 1) {
      $scope.person.appStatus = 'pending';
      if ($scope.person.numMissedOrientaion>2) {$scope.askToRemove($scope.person);}
    }
    //if person was moved into the scheduled array change thier status
    else if (index === 2) {
      $scope.person.appStatus = 'scheduled';
      $scope.addOrientation($scope.person);
    }
    else {
      console.log(index + " is not a recognized index please check the incubator function");
    }}
    console.log('ther active persons status is now: ' + $scope.person.appStatus);
    $http({
      method: 'PATCH',
      url: '/applicant/status/' + $scope.person._id,
      data: {status: $scope.person.appStatus}
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //DOES NOT EMAIL - keeps track of how many orientations a person has been scheduled for
  $scope.addOrientation = function (applicant){
    console.log('addint orientation for ' + $scope.person.last_name);
    //update all references localy
    $scope.person.numMissedOrientaion++;
    $scope.savePerson.numMissedOrientaion++;
    bucket:
    //search every bucket
    for (var i = 0; i < $scope.hatchery.length; i++) {
      //search every person in those buckets
      for (var j = 0; j < $scope.hatchery[i].length; j++) {
        //when a matching id is found
        if ($scope.hatchery[i][j]._id===$scope.person._id){
          console.log('person found adding orientation!');
          //add an orientation to that person
          $scope.hatchery[i][j].numMissedOrientaion++;
          //exit the bucket for loop
          break bucket;
        }
      }
    }
    //updates the database
    $http({
      method: 'PATCH',
      url: '/applicant/missed/' + $scope.person._id,
      data: $scope.person
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //sets active Applicant
  $scope.setActive = function(listIndex, personIndex){
    var i;
    var j;
    //create an acite person cloned from the selected person
    $scope.person = angular.copy($scope.hatchery[listIndex][personIndex]);
    //init the availibleSkills and availibleInterests as an array
    $scope.person.availibleSkills = [];
    $scope.person.availibleInterests = [];
    //check each active skill
    skill:
    for (i = 0; i < $scope.skills.length; i++) {
      //check each skill a applicant has
      for (j = 0; j < $scope.person.skills.length; j++) {
        if ($scope.skills[i].skill === $scope.person.skills[j]) {
          //if the applicant already has the skill continue to the nex skill
          continue skill;
        }
      }
      //if the skill was not found then add it to the availibleSkills
      $scope.person.availibleSkills.push($scope.skills[i].skill);
    }
    interest:
    for (i = 0; i < $scope.interests.length; i++) {
      //check each interest a applicant has
      for (j = 0; j < $scope.person.interests.length; j++) {
        if ($scope.interests[i].interest === $scope.person.interests[j]) {
          //if the applicant already has the interest continue to the nex interest
          continue interest;
        }
      }
      //if the interest was not found then add it to the availibleInterests
      $scope.person.availibleInterests.push($scope.interests[i].interest);
    }
    //create a active person backup
    $scope.savePerson = angular.copy($scope.hatchery[listIndex][personIndex]);
    console.log('the active person is: ' + $scope.person.name.first_name,
    $scope.person.name.last_name);
  };

  //Changes info view
  $scope.changeView = function (attribute) {
    console.log('changing view to: ' + attribute);
    $scope.activeView = attribute;
  };

  $scope.checkAll = function (hat){
    var i;
    //search every person in the hat array
    for (i = 0; i < hat.length; i++) {
      //if one person is found with a check mark
      if (hat[i].checked === true) {
        //set all check boxes in that array to false
        for (i = 0; i < hat.length; i++) {
          hat[i].checked = false;
        }
        return;
      }else{
        //if everyone in the hat is unchecked them then check them
        for (var j = 0; j < hat.length; j++) {
          hat[j].checked = true;
        }
        return;
      }
    }
  };

  $scope.email = function(){
    var emailList = [];
    //go threw each hat in hatchery
    for (var i = 0; i < $scope.hatchery.length; i++) {
      //search each person in that hat
      for (var j = 0; j < $scope.hatchery[i].length; j++) {
        //if that person has a check mark
        if ($scope.hatchery[i][j].checked === true) {
          //add them to the email list
          emailList.push($scope.hatchery[i][j]);
        }
      }
    }
    SweetFactory.emailSend(emailList);
  };

  //Removes person as a applicant and makes them a volunteer
  $scope.activate = function(){
    //go threw each hat in hatchery
    for (var i = 0; i < $scope.hatchery.length; i++) {
      //search each person in that hat
      for (var j = 0; j < $scope.hatchery[i].length; j++) {
        //if that person has a check mark
        if ($scope.hatchery[i][j].checked === true) {
          //add them to the email list
          $scope.addVolunteer($scope.hatchery[i][j]);
          $scope.removeAllData($scope.hatchery[i][j]);
        }
      }
    }
  };

  $scope.addVolunteer = function(volunteer){
    $http({
      method: 'POST',
      url: '/volunteer/applicant',
      data: volunteer
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //makes active person data editable
  $scope.edit = function(){
    $scope.person.edit = true;
  };

  //makes active person data editable
  $scope.saveEdit = function(){
    $scope.person.edit = false;
    //save the id
    $scope.id = $scope.person._id;
    //update the backup person
    $scope.savePerson = angular.copy($scope.person);
    //label the for loop so i can break it later
    bucket:
    //search every bucket
    for (var i = 0; i < $scope.hatchery.length; i++) {
      //search every person in those buckets
      for (var j = 0; j < $scope.hatchery[i].length; j++) {
        //when a matching id is found
        if ($scope.hatchery[i][j]._id===$scope.id){
          //update the person in that bucket
          $scope.hatchery[i][j] = angular.copy($scope.person);
          //exit the bucket loop
          break bucket;
        }
      }
    }
    //update server with changes
    $http({
      method: 'PUT',
      url: '/applicant/' + $scope.id,
      data: $scope.person
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //reverts changes made while editing
  $scope.cancelEdit = function(){
    $scope.person.edit = false;
    //reset active data from backup person
    $scope.person = angular.copy($scope.savePerson) ;
  };

  //add skill to active applicant user based on the selected skill
  $scope.addSkill = function(skill){
    //prevent blank skill from being added.
    if (typeof skill !== 'string') {
      return;
    }
    //add the skill to the applicants skills list
    $scope.person.skills.push(skill);
    //search the applicants availibleSkills
    for (var i = 0; i < $scope.person.availibleSkills.length; i++) {
      //when the skill is found remove it from availibleSkills
      if ($scope.person.availibleSkills[i] === skill) {
        $scope.person.availibleSkills.splice(i, 1);
        break;
      }
    }
  };

  //removes skill from active applicant
  $scope.removeSkill = function(index){
    //add skill to list availibleSkills
    $scope.person.availibleSkills.push($scope.person.skills[index]);
    //remove skill from applicant
    $scope.person.skills.splice(index,1);
  };

  //add interst based on the selected interest
  $scope.addInterest = function(interest){
    //prevent blank interests from being selected
    if (typeof interest !== 'string') {
      return;
    }
    //adds interest to applicants interests list
    $scope.person.interests.push(interest);
    //search the applicants availibleInterests
    for (var i = 0; i < $scope.person.availibleInterests.length; i++) {
      //find the interest and remove it from availibleInterests
      if ($scope.person.availibleInterests[i] === interest) {
        $scope.person.availibleInterests.splice(i, 1);
        break;
      }
    }
  };

  $scope.removeInterest = function(index){
    //add interest to the applicants availibleInterests
    $scope.person.availibleInterests.push($scope.person.interests[index]);
    //remove interest from applicants interests
    $scope.person.interests.splice(index, 1);
  };

  //determines button color based on number of missed orientations
  $scope.buttonColor = function(cat){
    if (cat.numMissedOrientaion < 2) {
      return 'green';
    }
    else if (cat.numMissedOrientaion === 2) {
      return 'yellow';
    }else{
      return 'red';
    }
  };
  //verifies removal if remove applicant DELETE button was pushed
  $scope.removeApplicant = function(applicant){
    swal({
      title: ('THIS CAN NOT BE UNDONE'),
      text: ('Remove ' + applicant.name.first_name +
       ' ' + applicant.name.last_name + '? '),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ('Yes, remove ' + applicant.name.first_name),
      cancelButtonText: ('No, keep ' + applicant.name.first_name),
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-success',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Deleted!',
        (applicant.name.first_name +' ' + applicant.name.last_name +
        ' has been removed.'),
        'error'
      );
      //remove applicant
      $scope.removeAllData(applicant);
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Saved!',
          (applicant.name.first_name +' ' + applicant.name.last_name +
          ' has been saved.'),
          'success'
        );
      }
    });
    };

    //verifies removal if applicant missed 3 orientations
    $scope.askToRemove = function(applicant){
      //make the number of missed orientations a string
      JSON.stringify(applicant.numMissedOrientaion);
      //call confirm with seet alert
      swal({
        title: ('THIS CAN NOT BE UNDONE'),
        text: ('Remove ' + applicant.name.first_name +
         ' ' + applicant.name.last_name + '? ' + applicant.name.first_name +
         ' has missed ' + applicant.numMissedOrientaion + ' orientations.'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ('Yes, remove ' + applicant.name.first_name),
        cancelButtonText: ('No, keep ' + applicant.name.first_name),
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-success',
        buttonsStyling: false
      }).then(function () {
        swal(
          'Deleted!',
          (applicant.name.first_name +' ' + applicant.name.last_name +
          ' has been removed.'),
          'error'
        );
        //remove applicant
        $scope.removeAllData(applicant);
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Saved!',
            (applicant.name.first_name +' ' + applicant.name.last_name +
            ' will get another chance'),
            'success'
          );
        }
      });
    };

    //actually removes applicant
    $scope.removeAllData = function(applicant){
      $scope.person = {};
      console.log('removing applicant: ' + applicant.last_name);
      //remove applicant localy
      bucket:
      //search every bucket
      for (var i = 0; i < $scope.hatchery.length; i++) {
        //search every person in those buckets
        for (var j = 0; j < $scope.hatchery[i].length; j++) {
          //when a matching id is found
          if ($scope.hatchery[i][j]._id===applicant._id){
            $scope.hatchery[i].splice(j,1);
            break bucket;
          }
        }
      }
      $http({
        method: 'DELETE',
        url: '/applicant/' + applicant._id
      }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(error) {
        console.log('error', error);
      });
    };

    $scope.getFormFields();
    $scope.loadApplicants();

    setTimeout(function(){
      console.log($scope.skills);
    }, 500);
  }]);
