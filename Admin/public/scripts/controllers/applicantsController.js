emilyApp.controller('ApplicantsController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {
  console.log("ApplicantsController loaded.");
  $scope.bucketList= ['APPLIED','PENDING','SCHEDULED','APPROVED','PROGRAM ERROR!!! CHECK bucketList'];
  $scope.hatchery = [];
  $scope.applied = [
    { 'name': 'Patrick Stewart', 'drag': true },
    { 'name': 'Nathan Fillion', 'drag': true },
    { 'name': 'William Shatner', 'drag': true }
  ];
  $scope.pending = [
    { 'name': 'Kate Mulgrew', 'drag': true }
  ];
  $scope.scheduled = [
    { 'name': 'Scott Bakula',
    'drag': true,
    onDrop: 'dropCallback'
  },
];
$scope.approved = [
  { 'name': 'Avery Brooks', 'drag': true },
  { 'name': '	Harrison Ford', 'drag': true }
];
$scope.hatchery.push($scope.applied);
$scope.hatchery.push($scope.pending);
$scope.hatchery.push($scope.scheduled);
$scope.hatchery.push($scope.approved);

//Controlls what happens when a object is moved into a array using that array's index
$scope.incubator = function(index){
  //This is used to prevent posting when webpage is initially loaded
  if (init < $scope.hatchery.length){
    init = init + 1;
  }
  //if item was moved into the applied array
  else if (index === 0) {
    console.log('Item moved into applied');
  }
  //if item was moved into the pending array
  else if (index === 1) {
    console.log('Item moved into pending');
  }
  //if item was moved into the scheduled array
  else if (index === 2) {
    console.log('Item moved into scheduled');
  }
  //if item was moved into the approved array
  else if (index === 3) {
    console.log('Item moved into approved');
  }
  else {
    console.log(indext + " is not a recognized index please check the incubator function");
  }
};

}]);
