console.log('formFactory sourced');

myForm.factory('formFactory', function(){
  var myFactory = {};
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
  myFactory.essayOneQues = 'How did you hear about The Emily Program Foundation';
  myFactory.essayOneResponse= '';
  myFactory.essayTwoQues = 'Why are you interested in volunteering? Describe any particular skills or experience you feel you would bring to The Emily Program Foundation';
  myFactory.essayTwoResponses = '';
  myFactory.essayThreeQues = '';
  myFactory.essayThreeResponse = '';
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
  return myFactory;
});
