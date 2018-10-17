function fetch() {
  $("#error").text("");
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
  //regex patterns
  //Wins",\s*"value": "([\d]*)
  //Win%",\s*"value": "([\d]*)
  //Kills",\s*"value": "([\d]*)
  //K\/d",\s*"value": "([\d]*)
  //Played",\s*"value": "([\d]*)
  //Top 10",\s*"value": "([\d]*)
  //Top 3s",\s*"value": "([\d]*)
  //Top 5s",\s*"value": "([\d]*)

  request(options, function (error, response, body) {
    if (body.includes('Player Not Found')) {
      $("#error").text('Player not found!');
    }
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    var wins = /Wins",\s*"value": "([\d]*)/;
    var winp = /Win%",\s*"value": "([\d]*)/;
    var kills = /Kills",\s*"value": "([\d]*)/;
    var played = /Played",\s*"value": "([\d]*)/;
    var top10 = /Top 10",\s*"value": "([\d]*)/;
    var top5 = /Top 5s",\s*"value": "([\d]*)/;
    var top3 = /Top 3s",\s*"value": "([\d]*)/;
    var mwin = wins.exec(body);
    var mwinp = winp.exec(body);
    var mkills = kills.exec(body);
    var mplayed = played.exec(body);
    var mtop10 = top10.exec(body);
    var mtop5 = top5.exec(body);
    var mtop3 = top3.exec(body);
    console.log("Wins: " + mwin[1] + " Win%: " + mwinp[1] + " Kills: " + mkills[1] + " Played matches: " + mplayed[1] + " Top 10: " + mtop10[1] + " Top5: " + mtop5[1] + " Top3: " + mtop3[1]);
    $("#statwins").text(`Wins: ${mwin[1]}`);
    $("#stattop3").text(`Top3: ${mtop3[1]}`);
    $("#stattop5").text(`Top5: ${mtop5[1]}`);
    $("#stattop10").text(`Top10: ${mtop10[1]}`);
    $("#statwl").text(`W/L:: ${mwinp[1]}%`);
    $("#statpm").text(`Played matches: ${mplayed[1]}`);
    $("#statkills").text(`Kills: ${mkills[1]}`);
  });
}
