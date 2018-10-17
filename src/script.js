function fetch() {
  var cons = $("#selection option:selected").val();
  var uname = $("#username").val();
  req(uname, cons);
}

function req(user, device) {
  const config = require('./config.json');
  var request = require('request');
  var options = {
    url: config.url + device + "/" + user,
    headers: {
      'TRN-Api-Key': config.key,
    }
  };
  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
  });
}