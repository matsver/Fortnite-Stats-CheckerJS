function fetch() {
  var console = $("#selection option:selected").val();
  var uname = $("#username").val();
  $("#area").val(uname + console);
  req(uname, console);
}

function req(user, device) {
  const config = require('./config.json');
  var request = require('request');
  request.get(config.url).on('response', function (response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    $("#area").val(response.statusCode);
  })
}