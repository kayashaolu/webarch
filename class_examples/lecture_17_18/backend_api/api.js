var express = require('express'); 
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies

var sqlite3 = require('sqlite3').verbose();
var db_file = "my_db_file";


app.post('/quote', function (req, res) {
  day = req.body.day_of_week;
  console.log("Received request for quote for day " + day);
  res.json({ 'day': day, 'quote': quote_db[day] });
});

var server = app.listen(3000, function () {
  console.log('Server on localhost listening on port 3000');
});
