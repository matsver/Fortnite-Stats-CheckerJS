const config = require('config.json');
const request = require('request');

function fetch() {
  var console = $("#selection option:selected").val();
  var uname = $("#username").val();
  $("#area").val(uname + console);
  request(uname, console);
}

function request(user, device) {
  request.get(config.url).on('response', function (response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    // $("#area").val(response.statusCode);
  })
}