emilyApp.filter('dateFormate', function(){
   return function(input){
     if (!input)return;
     var x = 5
     if (input.slice(5,6)==='0' )x=6;
     return input.slice(x,10) + '-' + input.slice(0,4);
    };
  });


emilyApp.filter('phoneNumFormate', function(){
   return function(input){
     if (!input)return;
     var input = input.toString()
     return '(' + input.slice(0,3) + ') ' + input.slice(3,6) + '-' + input.slice(6);
    };
  });
