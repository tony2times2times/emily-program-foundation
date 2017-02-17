console.log('js sourced');

var myForm = angular.module('myForm',['ngRoute']);

myForm.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/volInfo', {
    templateUrl: '../views/partials/volInfo.html',
    controller: 'VolInfoController'
  })
  .when('/essayQues', {
    templateUrl: '../views/partials/essayQues.html',
    controller: 'EssayController'
  })
  .when('/interestSkills', {
    templateUrl: '../views/partials/interestSkills.html',
    controller: 'SkillsController'
  })
  .when('/references', {
    templateUrl: '../views/partials/references.html',
    controller: 'ReferencesController'
  })
  .when('/waiver', {
    templateUrl: '../views/partials/waiver.html',
    controller: 'WaiverController'
  })
  .when('/volReqs', {
    templateUrl: '../views/partials/volReqs.html',
    controller: 'ReqsController'
  })
  .when('/thankYou', {
    templateUrl: '../views/partials/thankYou.html',
    controller: 'ThanksController'
  })
  .otherwise({
    redirectTo: 'volReqs'
  });
}]); //end routeProvider

myForm.controller('EssayController', ['$scope', '$http', '$window', '$location', 'formFactory', function($scope, $http, $location, $window, formFactory){
  // begin validation for inputs and alert user if input is skipped
    $scope.firstLook = true;
    var form = document.getElementById('essayQuest');
      form.noValidate = true;
      form.addEventListener('submit', function(event){
        if(!event.target.checkValidity()){
          swal('Please fill out all fields!');
          $scope.firstLook = false;
        } else {
          window.location = '#!/waiver';
        }
      }, false); //end validation sequence
  //previous button
  $scope.essayPrev = function(){
    window.location ='#!/references';
  };
  //next button
  $scope.essayNext = function(){
    window.location = '#!/waiver';
  };
  $scope.ff = formFactory;
}]); //end EssayController

myForm.controller('FormController', ['$scope', '$http', 'formFactory', function($scope, $http, formFactory){
  console.log('ng sourced');

  $scope.getFormFields = function(){
    console.log("Getting feilds for form");

    $http({
      method: 'GET',
      url: '/formFields'
    }).then(function(response){
      console.log('response', response);

      formFactory.allSkills = response.data.skills;
      formFactory.allIntersts = response.data.interests;
      formFactory.allQuestions = response.data.essayQuestions[0];
    });//end http
  };// end getFormFields()

}]); //end FormController

myForm.controller('ReferencesController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window, formFactory){
  // begin validation for inputs and alert user if input is skipped
    $scope.firstLook = true;
    var form = document.getElementById('formRef');
      form.noValidate = true;
      form.addEventListener('submit', function(event){
        if(!event.target.checkValidity()){
          swal('Please fill out all fields!');
          $scope.firstLook = false;
        } else {
          window.location = '#!/essayQues';
        }
      }, false); //end validation sequence
  //previous button
  $scope.refPrev = function(){
    window.location ='#!/interestSkills';
  };
  //next button
  $scope.refNext = function(){
    window.location ='#!/essayQues';
  };

  $scope.ff = formFactory;
}]);

myForm.controller('ReqsController',['$scope', '$http','$location', '$window', function($scope, $http, $location, $window){
    //begin application button
  $scope.beginApp = function(){
    window.location ='#!/volInfo';
  };

  $scope.showInfoCard = function(content){
    document.getElementById('infoContent').innerHTML = content;
    $scope.hideInfoCard = false;
  }; // end showInfoCard

  //pop-up for information about the various volunteer opportunities
  $scope.blogWriting = "<p>We need volunteers to help us explore the messages we are bombarded with in the media and to help us to inspire positive body image in others.  We do this through our Media Monday Blog Series as well as our Love Your Body Blog Series.  Both of these series help us to inspire and create conversation to bring about a new way of looking at health and wellbeing.  To read our blog, <a target='_blank' href='http://emilyprogramfoundation.org/news-events/blog/'>click here</a>.  We are always recruiting blog writers. No need to apply. Questions or a submission? <a href='mailto:emily.monson@emilyprogramfoundation.org'>Contact Emily</a>.</p><p><i>Media Monday</i> – We need volunteer writers to contribute to our Media Monday Blog.  Volunteers use their skills in media literacy to critique and analyze the messages the media sends about body image and related topics. Writers pick a topic and respond to a series of questions aimed at addressing the stereotypes prevalent in the media.  Writers can choose anything from a commercial they view on television, an ad they find in a magazine, a billboard on the side of the road, or even an ad they see on the city bus.</p><p><i>Love Your Body Blog</i> – We need volunteer writers to contribute to our Love Your Body Blog.  Volunteers have the opportunity to express their excitement and celebration about their own body or simply spread encouragement for others to find their appreciation and love for their bodies. This blog post is about inspiring readers to reflect on the unique beauty and strength of our bodies. Writers for this blog can follow any format that they wish; some take the form of poetry and some take the form of a story. Some writers choose to delve into an appreciation about one specific part of their body while other writers choose many things they love about themselves and their bodies. We ask that writers for this blog write about things beyond body weight and shape because our beauty is much more than a person’s weight and shape – we want to highlight all of the great things about ourselves and our bodies!</p><p><i>Recovery Stories</i> – We are looking for individuals to share their recovery experiences with others in order to inspire hope that recovery is possible.  Please follow <a target='_blank' href='http://www.nationaleatingdisorders.org/guidelines-sharing-your-story-responsibly'>NEDA’s Guidelines for Sharing Your Story.</a> Stories can be published anonymously if preferred.</p>";
  $scope.advocacy = "Advocacy is empowering, affirming, and a necessary component in fighting eating disorders across the globe. Advocacy is about having a voice, being part of the solution and standing up for what you believe in which is crucial to achieve our mission.  We ask volunteers to support advocacy in a variety of ways.  These opportunities arise when action is necessary, often surrounding events.  We need a large quantity of volunteers to support these activities as we often see a greater impact in numbers. These efforts could include, but are not limited to the following:<ul><li>Assist in letter writing and/or social media campaigns when action is needed (remember to follow up on <a target='_blank' href='https://www.facebook.com/TheEmilyProgramFoundation'>Facebook</a> and <a target='_blank' href='https://twitter.com/EmilyFoundation'>Twitter</a>).</li><li>Keep the Foundation informed of relevant messages in the media that require response.</li><li> Attend the Eating Disorder Coalition’s Lobby Day on behalf of the Foundation (occurs in spring and fall – watch for updates).</li></ul>";
  $scope.officeWork = "Day-to-day operations of the Foundation are crucial to keeping our education and advocacy efforts going.  We have opportunities for one volunteer to help with daily administrative tasks (3 month minimum commitment). Schedule is part time and flexible, and some of the tasks could include:<ul> <li>Sending thank you notes for donations</li><li>Historian (documenting The Emily Program Foundation in the news)</li><li>Book reviews for the Lending Library</li><li>Keeping Lending Library organized and up to date</li><li>Research for various projects</li><li>Inventory of supplies/promotional items</li></ul>";
  $scope.specialEvents = "The Foundation often hosts events in the community (both education events and fundraising events).  Volunteers play pivotal roles in helping make these events happen.  Volunteers typically work on one event at a time.  Some of the roles volunteers could play are as follows:<ul><li>Sharing your recovery story at Recovery Night</li><li>Setting up/cleaning up at community events</li><li>Tabling at community events</li><li>Launching community awareness campaigns</li><li>Help with fundraising events, which could include the following:</li><ul><li>Soliciting donations (auction items, sponsors, food for meetings, etc.)</li><li>Promotion of the event</li><li>Coordinating the program</li><li>Day of set-up/clean-up tasks</li></ul>";
}]);//end ReqsController

myForm.controller('SkillsController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window, formFactory){
  //dynamically generated skills list and sending to factory
  $scope.skillsIn = formFactory.skillsIn;
  $scope.skills = formFactory.allSkills;
  //dynamically generated interest list and sending to factory
  $scope.interestsIn = formFactory.interestsIn;
  $scope.interests = formFactory.allIntersts;
  //previous button
  $scope.skillsPrev = function(){
    window.location ='#!/volInfo';
  };
  //next button
  $scope.skillsNext = function(){
    console.log('InterestsIn', $scope.interestsIn);
    window.location ='#!/references';
  };
}]); //end SkillsController

myForm.controller('ThanksController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window, formFactory){

}]);

myForm.controller('VolInfoController', ['$scope', '$http', '$location', '$window', 'formFactory', function($scope, $http, $location, $window,formFactory){
  //begin validation for inputs and alert user if input is skipped
    $scope.firstLook = true;
    var form = document.getElementById('formID');
      form.noValidate = true;
      form.addEventListener('submit', function(event){
        if(!event.target.checkValidity()){
          swal('Please fill out all fields!');
          $scope.firstLook = false;
          // window.location ='#!/volInfo';
        } else {
          window.location = '#!/interestSkills';
        }

      }, false); //end validation sequence
  //next button function
  $scope.infoPrev = function(){
    window.location = '#!/volReqs';
  };
  //previous button function
  $scope.infoNext = function(){
    window.location = '#!/interestSkills';
  };
    $scope.ff = formFactory;
}]);//endVolInfoController


myForm.controller('WaiverController', ['$scope', '$http', '$location', 'formFactory', function($scope, $http, $location, formFactory){
  //validating the checkbox
  $scope.validateCheck = function(event){
    var x = document.getElementById("signed").checked;
    console.log('is checked? ->', x);
    if(x === true){
      console.log('true');
      submitApp();
    } else {
      swal('Please sign the terms and conditions by checking the box. Thank you!');
      console.log('false');
      window.location = '#!/waiver';
    }
  };
  //previous button
  $scope.wavPrev = function(){
    window.location ='#!/essayQues';
  };
  //submit button
  function submitApp(){
    console.log('Submiting Form');
    var sendData = {
      additionalInfo: formFactory.additionalInfo,
      street: formFactory.street,
      city: formFactory.city,
      state: formFactory.state,
      zip: formFactory.zip,
      email: formFactory.email,
      phoneNum: formFactory.phoneNum,
      dateOfBirth: formFactory.dateOfBirth,
      emergancyName: formFactory.emergencyName,
      emergancyPhone: formFactory.emergencyPhone,
      employment: formFactory.employment,
      essayOne: {
          question: formFactory.allQuestions[1],
          response: formFactory.essayOneResponse
        },
      essayTwo:{
          question: formFactory.allQuestions[2],
          response: formFactory.essayTwoResponse
        },
      essayThree:{
          question: formFactory.allQuestions[3],
          response: formFactory.essayThreeResponse
        },
      essayFour:{
          question: formFactory.allQuestions[4],
          response: formFactory.essayFourResponse
        },
      intersts: formFactory.onlyTrueToArray( formFactory.interestsIn ),
      firstName: formFactory.firstName,
      lastName: formFactory.lastName,
      referenceOne:{
          name: formFactory.refOneName,
          email: formFactory.refOneEmail,
          phone: formFactory.refOnePhone
        },
      referenceTwo:{
          name: formFactory.refTwoName,
          email: formFactory.refTwoEmail,
          phone: formFactory.refTwoPhone
        },
      skills: formFactory.onlyTrueToArray( formFactory.skillsIn )
    };// end sendData
    //start POST request to DB
    console.log('Data to Send = ', sendData);
    $http({
      method: 'POST',
      url: '/',
      data: sendData
    }).then(function(response){
      console.log(response);
    });//end http
    window.location ='#!/thankYou';
  }//end submitApp()
}]);//end waiverController

//filter out the underscores from the interests and skills section
myForm.filter('removeUnderscores', function(){
   return function(input){
     if (!input)return;
    for (var i = 0; i < input.length; i++) {
        if (input[i] == '_') {
          input = input.substr(0,i) + ' ' + input.substr(i+1);
        }// end if
      } // end for
    return input;
    };
  });
