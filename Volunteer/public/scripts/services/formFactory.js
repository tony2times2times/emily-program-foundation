console.log('formFactory sourced');

myForm.factory('formFactory', function(){
  var myFactory = {};
  myFactory.firstname = '';

  return myFactory;
});
