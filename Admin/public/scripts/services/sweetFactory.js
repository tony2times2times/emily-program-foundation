emilyApp.factory('SweetFactory', function($http){
  var Sweet = {};

  Sweet.emailStrip = function(recipientArray){
    // First, perform deep clone of array.
    var outputArray = JSON.parse(JSON.stringify(recipientArray));
    var firstLevelPropertiesToDelete = [additionalInfo, appStatus, dateBegan, dateOfBirth, emailedWhat, emergencyContact, employment, essayOne, essayTwo, essayThree, essayFour, interests, notes, numMissedOrientaion, referenceOne, referenceTwo, skills];
    for (var i = 0; i < firstLevelPropertiesToDelete.length; i++) {
      if (outputArray.hasOwnProperty(firstLevelPropertiesToDelete[i])) {
        delete outputArray[firstLevelPropertiesToDelete[i]];
      }
    }
    if (outputArray.contactInfo.hasOwnProperty('address')) {
      delete outputArray.contactInfo.address;
    }
    if (outputArray.contactInfo.hasOwnProperty('phoneNum')) {
      delete outputArray.contactInfo.phoneNum;
    }
    return outputArray;
  };

  Sweet.emailSend = function(recipientArray){
    /* Format of recipientArray (from /model/volunteer.js):
    [
      {name:        {
                      first_name: <name>,
                      last_name: <name>
                    },
      contactInfo:  {
                      email: <email address>
                    }
      }, {<name/email 2>}, etc.
    ]
    */
    var recipientAddressList = '';
    for (var i = 0; i < recipientArray.length; i++) {
      recipientAddressList += recipientArray[i].name.first_name + ' ' + recipientArray[i].name.last_name + ' (' + recipientArray[i].contactInfo.email + ')';
      if (i < (recipientArray.length - 1)) {
        recipientAddressList += ', ';
      }
    }
    var swalInputOptions = {};
    $http.get('/private/emailTemplate').then(function(response){
      emailTemplateArray = response.data;
      for (var j = 0; j < emailTemplateArray.length; j++) {
        swalInputOptions[j] = emailTemplateArray[j].name;
      }
      swal({
        title: 'Select an email template:',
        input: 'select',
        inputOptions: swalInputOptions,
        inputPlaceholder: 'Select template',
        showCancelButton: true,
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value >= 0) {
              resolve();
            } else {
              reject('You must select a template to continue.');
            }
          });
        }
      }).then(function(index){
        swal({
          title: 'Email to send:',
          width: '700px',
          showCancelButton: true,
          confirmButtonText: 'Send Email(s)',
          showLoaderOnConfirm: true,
          html:
            '<style type="text/css"> table {margin: 0 auto;' +
            'text-align: left; font: 14px arial, sans-serif;}' +
            'td {vertical-align: top; padding: 5px;}' +
            '.left {width: 100px;} .right {width: 450px;}' +
            '</style><table><tr><td class="left">Template:</td>' +
            '<td class="right">' + emailTemplateArray[index].name +
            '</td></tr><tr><td>To (singly):</td><td>' + recipientAddressList +
            '</td></tr><tr><td>From:</td><td>' +
            'The Emily Program Foundation</td></tr><tr><td>Subject:' +
            '</td><td>' + emailTemplateArray[index].subject +
            '</td></tr><tr><td>Body:</td><td><p>Dear (addressee),</p>' +
            emailTemplateArray[index].body + '</td></tr></table>',
          preConfirm: function(){
            return new Promise(function(resolve){
              var objectToSend = {
                templateID: emailTemplateArray[index]._id,
                recipientArray: recipientArray
              };
              console.log(objectToSend);
              $http.post('/private/sendEmail', objectToSend).then(function(){
                resolve();
              });
            });
          }
        }).then(function(){
          swal('Emails sent!',
            'Check the admin e-mail account. Emails that fail delivery' +
            ' will generate a return, failure e-mail.',
            'success'
          );
        });
      }).catch(swal.noop);
    });
  };
  return Sweet;
});
