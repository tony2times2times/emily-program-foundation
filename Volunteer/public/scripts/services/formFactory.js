console.log('formFactory sourced');

myForm.factory('formFactory', function(){
  var myFactory = {};
  myFactory.allSkills = [];
  myFactory.allIntersts = [];
  myFactory.allQuestions = [];

  myFactory.firstName = '';
  myFactory.lastName = '';
  myFactory.dateOfBirth = '';
  myFactory.street = '';
  myFactory.city = '';
  myFactory.state = '';
  myFactory.zip = '';
  myFactory.email = '';
  myFactory.phoneNum = '';
  myFactory.employment = '';
  
  myFactory.essayTwoQues = 'Why are you interested in volunteering?';
  myFactory.essayThreeQues = 'What do you hope to get out of volunteering for The Emily Program Foundation?';
  myFactory.essayFourQues = 'Describe any particular skills or experience you feel you would bring to The Emily Program Foundation.';

  myFactory.essayOneResponse= '';
  myFactory.essayTwoResponse = '';
  myFactory.essayThreeResponse = '';
  myFactory.essayFourResponse = '';
  myFactory.additionalInfo = '';
  myFactory.refOneName = '';
  myFactory.refOnePhone = '';
  myFactory.refOneEmail = '';
  myFactory.refTwoName = '';
  myFactory.refTwoPhone = '';
  myFactory.refTwoEmail = '';
  myFactory.emergencyName = '';
  myFactory.emergencyPhone = '';

  myFactory.skillsIn = {};
  myFactory.interestsIn= {};

  myFactory.onlyTrueToArray = function( object ){
    var array = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key]) array.push(key);
      }
    }
    return array;
  };

  return myFactory;
});
