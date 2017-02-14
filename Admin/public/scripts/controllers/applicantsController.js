emilyApp.controller('ApplicantsController', ["$scope", "$http","$timeout", "VolunteerFactory",
function($scope, $http, $timeout, VolunteerFactory) {
  console.log("ApplicantsController loaded.");
  var init=0;
  $scope.activeView = 'info';
  $scope.person = {};
  $scope.hatList= ['APPLIED','PENDING','SCHEDULED','PROGRAM ERROR!!! CHECK bucketList'];
  $scope.hatchery = [];
  $scope.applied = [];
  $scope.pending = [];
  $scope.scheduled = [];
  $scope.hatchery.push($scope.applied);
  $scope.hatchery.push($scope.pending);
  $scope.hatchery.push($scope.scheduled);

  $scope.loadApplicants = function(){
    //on page load get all aplicants
    $http({
      method: 'GET',
      url: '/applicant'
    }).then(function successCallback(response) {
      console.log(response);
      //for every volunteer in the response
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
    }
    //if person was moved into the pending array change thier status
    else if (index === 1) {
      $scope.person.appStatus = 'pending';
    }
    //if person was moved into the scheduled array change thier status
    else if (index === 2) {
      $scope.person.appStatus = 'scheduled';
    }
    else {
      console.log(index + " is not a recognized index please check the incubator function");
    }}
    console.log('ther active persons status is now: ' + $scope.person.appStatus);
    $scope.id = $scope.person._id;
    $http({
      method: 'PATCH',
      url: '/applicant/status/' + $scope.id,
      data: {status: $scope.person.appStatus}
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };

  //sets active Applicant
  $scope.setActive = function(listIndex, personIndex){
    //create an acite person cloned from the selected person
    $scope.person = angular.copy($scope.hatchery[listIndex][personIndex]);
    //create a active person backup
    $scope.savePerson = angular.copy($scope.hatchery[listIndex][personIndex]);
    console.log('the active person is: ' + $scope.person.name.first_name, $scope.person.name.last_name);
  };
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
    for (var i = 0; i < hatchery.length; i++) {
      //search each person in that hat
      for (var j = 0; j < hatchery[i].length; j++) {
        //if that person has a check mark
        if (hatchery[i][j].checked === true) {
          //add them to the email list
          emailList.push(hatchery[i][j]);
        }
      }
    }
    $http({
      method: 'PUT',
      url: '',
      data: emailList
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log('error', error);
    });
  };
  $scope.activate = function(){
    var activeList = [];
    //go threw each hat in hatchery
    for (var i = 0; i < hatchery.length; i++) {
      //search each person in that hat
      for (var j = 0; j < hatchery[i].length; j++) {
        //if that person has a check mark
        if (hatchery[i][j].checked === true) {
          //add them to the email list
          activeList.push(hatchery[i][j]);
        }
      }
    }
    $http({
      method: 'PUT',
      url: '',
      data: activeList
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
    //update the backup person
    $scope.id = $scope.person._id;
    $scope.savePerson = angular.copy($scope.person);
    //search every bucket
    bucket:
    for (var i = 0; i < $scope.hatchery.length; i++) {
      //search every person in those buckets
      for (var j = 0; j < $scope.hatchery[i].length; i++) {
        //when a matching id is found
        if ($scope.hatchery[i][j]._id===$scope.id){
          //update the person in that bucket
          $scope.hatchery[i][j] = angular.copy($scope.person);
          //exit the bucket for loop
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

  //removes skill from active user
  $scope.removeSkill = function(index){
    $scope.person.skills.splice(index,1);
  };

  $scope.loadApplicants();
}]);
