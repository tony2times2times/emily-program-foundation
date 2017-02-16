emilyApp.factory('SweetFactory', function ($http) {
  var Sweet = {};

  Sweet.emailSend = function (recipientArray) {
    /* Format of recipientArray (from /model/volunteer.js):
    [
      {name:  {
                first_name: <name, in lower case>,
                last_name: <name, in lower case>
              },
      email:  <email address>},
      {<name/email 2>},
      etc.
    ]
    */
    var recipientAddressList = '';
    for (var i = 0; i < recipientArray.length; i++) {
      recipientAddressList += recipientArray[i].name.first_name + ' ' + recipientArray[i].name.last_name + ' (' + recipientArray[i].email + ')';
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
            '<style type="text/css">' +
            'table {margin: 0 auto;' +
            'text-align: left;' +
            'font: 14px arial, sans-serif;}' +
            'td {vertical-align: top; ' +
            'padding: 5px;}' +
            '.left {width: 100px;}' +
            '.right {width: 450px;}' +
            '</style><table><tr>' +
            '<td class="left">Template:</td>' +
            '<td class="right">' +
            emailTemplateArray[index].name +
            '</td></tr><tr><td>To:</td><td>' + recipientAddressList + '</td></tr>' +
            '<tr><td>From:</td><td>' +
            'The Emily Program Foundation' +
            '</td></tr><tr><td>Subject:</td><td>' +
            emailTemplateArray[index].subject +
            '</td></tr><tr><td>Body:</td><td>' +
            '<p>Dear (addressee),</p>' +
            emailTemplateArray[index].body +
            '</td></tr></table>'
        });
      });
    });
  };
  return Sweet;
});
