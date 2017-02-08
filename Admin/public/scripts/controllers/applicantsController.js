emilyApp.controller('ApplicantsController', ["$scope", "$http","$timeout", "VolunteerFactory",
function($scope, $http, $timeout, VolunteerFactory) {
  console.log("ApplicantsController loaded.");
  var init=0;
  $scope.activeView = 'skills';
  $scope.bucketList= ['APPLIED','PENDING','SCHEDULED','APPROVED','PROGRAM ERROR!!! CHECK bucketList'];
  $scope.hatchery = [];
  $scope.applied = [
    {
      'name' :{
        'first_name' : 'Patrick',
        'last_name' : 'Stewart',
      },
      'address': {
        'street' :'1234',
        'city' : 'Patty Lane Drive Road',
        'state' : 'MN',
        'zip' : '55736',
      },
      'email' : 'SirPatrickStewart@gmail.com',
      'phoneNum' : '808-867-5309',
      'dateOfBirth' : '13 July 1940',
      'emergencyContact' : {
        'name' : 'Tony Peraza',
        'phone' : '763-439-3173',
      },
      'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
      'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
      'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
      'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      'interests' : 'Fundraising',
      referenceOne : {
      'name' : 'Jonathan Frakes',
      'email' : 'Jonathan.Frankes@gmail.com',
      'phone' : '952-867-5309',
    },
    referenceTwo :{
      'name' : 'Gates McFadden',
      'email' : 'Gates.McFadden@gmail.com',
      'phone' : '952-867-5309',
    },
      'skills' : ['blogging', 'public speaking', '3-D chess']
    },

    {
      'name' : {
        'first_name' : 'Nathan',
        'last_name' : 'Fillion',
      },
      'address': {
        'street' :'1234',
        'city' : 'Patty Lane Drive Road',
        'state' : 'MN',
        'zip' : '55736',
      },
      'email' : 'SirPatrickStewart@gmail.com',
      'dateOfBirth' : '13 July 1940',
      'emergencyContact' : {
        'name' : 'Tony Peraza',
        'phone' : '763-439-3173',
      },
      'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
      'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
      'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
      'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      'interests' : 'Fundraising',
      referenceOne : {
      'name' : 'Jonathan Frakes',
      'email' : 'Jonathan.Frankes@gmail.com',
      'phone' : '952-867-5309',
    },
    referenceTwo :{
      'name' : 'Gates McFadden',
      'email' : 'Gates.McFadden@gmail.com',
      'phone' : '952-867-5309',
    },
      'skills' : ['blogging', 'public speaking', '3-D chess']
    },

    {
      'name' :{
        'first_name' : 'William',
        'last_name' : 'Shatner',
      },
      'address': {
        'street' :'1234',
        'city' : 'Patty Lane Drive Road',
        'state' : 'MN',
        'zip' : '55736',
      },
      'email' : 'SirPatrickStewart@gmail.com',
      'dateOfBirth' : '13 July 1940',
      'emergencyContact' : {
        'name' : 'Tony Peraza',
        'phone' : '763-439-3173',
      },
      'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
      'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
      'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
      'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      'interests' : 'Fundraising',
      referenceOne : {
      'name' : 'Jonathan Frakes',
      'email' : 'Jonathan.Frankes@gmail.com',
      'phone' : '952-867-5309',
    },
    referenceTwo :{
      'name' : 'Gates McFadden',
      'email' : 'Gates.McFadden@gmail.com',
      'phone' : '952-867-5309',
    },
      'skills' : ['blogging', 'public speaking', '3-D chess']
    },
  ];
  $scope.pending = [
    {
      'name' :{
        'first_name' : 'Kate',
        'last_name' : 'Mulgrew',
      },
      'address': {
        'street' :'1234',
        'city' : 'Patty Lane Drive Road',
        'state' : 'MN',
        'zip' : '55736',
      },
      'email' : 'SirPatrickStewart@gmail.com',
      'dateOfBirth' : '13 July 1940',
      'emergencyContact' : {
        'name' : 'Tony Peraza',
        'phone' : '763-439-3173',
      },
      'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
      'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
      'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
      'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      'interests' : 'Fundraising',
      referenceOne : {
      'name' : 'Jonathan Frakes',
      'email' : 'Jonathan.Frankes@gmail.com',
      'phone' : '952-867-5309',
    },
    referenceTwo :{
      'name' : 'Gates McFadden',
      'email' : 'Gates.McFadden@gmail.com',
      'phone' : '952-867-5309',
    },
      'skills' : ['blogging', 'public speaking', '3-D chess']
    },
  ];
  $scope.scheduled = [
    {
      'name' :{
        'first_name' : 'Kate',
        'last_name' : 'Mulgrew',
      },
      'address': {
        'street' :'1234',
        'city' : 'Patty Lane Drive Road',
        'state' : 'MN',
        'zip' : '55736',
      },
      'email' : 'SirPatrickStewart@gmail.com',
      'dateOfBirth' : '13 July 1940',
      'emergencyContact' : {
        'name' : 'Tony Peraza',
        'phone' : '763-439-3173',
      },
      'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
      'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
      'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
      'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      'interests' : 'Fundraising',
      referenceOne : {
      'name' : 'Jonathan Frakes',
      'email' : 'Jonathan.Frankes@gmail.com',
      'phone' : '952-867-5309',
    },
    referenceTwo :{
      'name' : 'Gates McFadden',
      'email' : 'Gates.McFadden@gmail.com',
      'phone' : '952-867-5309',
    },
      'skills' : ['blogging', 'public speaking', '3-D chess']
    },
  ];
  $scope.approved = [
    {'name' :{
      'first_name' : 'Avery',
      'last_name' : 'Brooks',
    },
    'address': {
      'street' :'1234',
      'city' : 'Patty Lane Drive Road',
      'state' : 'MN',
      'zip' : '55736',
    },
    'email' : 'SirPatrickStewart@gmail.com',
    'dateOfBirth' : '13 July 1940',
    'emergencyContact' : {
      'name' : 'Tony Peraza',
      'phone' : '763-439-3173',
    },
    'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
    'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
    'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
    'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    'interests' : 'Fundraising',
    referenceOne : {
    'name' : 'Jonathan Frakes',
    'email' : 'Jonathan.Frankes@gmail.com',
    'phone' : '952-867-5309',
  },
  referenceTwo :{
    'name' : 'Gates McFadden',
    'email' : 'Gates.McFadden@gmail.com',
    'phone' : '952-867-5309',
  },
    'skills' : ['blogging', 'public speaking', '3-D chess']
  },
  {
    'name' :{
      'first_name' : 'Harrison',
      'last_name' : 'Ford',
    },
    'address': {
      'street' :'1234',
      'city' : 'Patty Lane Drive Road',
      'state' : 'MN',
      'zip' : '55736',
    },
    'email' : 'SirPatrickStewart@gmail.com',
    'dateOfBirth' : '13 July 1940',
    'emergencyContact' : {
      'name' : 'Tony Peraza',
      'phone' : '763-439-3173',
    },
    'employment' : 'U.S.S. Enterprise (NCC-1701-D) Captain',
    'essayOne' : 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
    'esssayTwo' : 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',
    'essayThree' : "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    'interests' : 'Fundraising',
    referenceOne : {
    'name' : 'Jonathan Frakes',
    'email' : 'Jonathan.Frankes@gmail.com',
    'phone' : '952-867-5309',
  },
  referenceTwo :{
    'name' : 'Gates McFadden',
    'email' : 'Gates.McFadden@gmail.com',
    'phone' : '952-867-5309',
  },
    'skills' : ['blogging', 'public speaking', '3-D chess']
  },
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

//sets active Applicant
$scope.setActive = function(listIndex, personIndex){
  $scope.person = $scope.hatchery[listIndex][personIndex];
  $scope.skills = $scope.person.skills;
  console.log('the active person is: ' + $scope.person.name.first_name, $scope.person.name.last_name);
};
$scope.changeView = function (attribute) {
  console.log('changing view to: ' + attribute);
    $scope.activeView = attribute;
};

}]);
