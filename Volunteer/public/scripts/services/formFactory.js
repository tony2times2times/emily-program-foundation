myForm.factory('formFactory', function(){
  var myFactory = {};
  myFactory.allSkills = [];
  myFactory.allIntersts = [];
  myFactory.allQuestions = {1:'',2:'',3:'',4:''};

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
