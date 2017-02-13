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
  myFactory.essayOneResponse= '';
  myFactory.essayTwoResponses = '';
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
  return myFactory;
});
