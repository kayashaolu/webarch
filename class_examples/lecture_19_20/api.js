var express = require('express'); 
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies

// An object that contains a quote that we want to display for a day of the week
var quote_db = {
  'sunday': "Life is about making an impact, not making an income. \
  –Kevin Kruse",
  'monday': "Whatever the mind of man can conceive and believe, it can achieve. \
  –Napoleon Hill",
  'tuesday': "Strive not to be a success, but rather to be of value. \
  –Albert Einstein",
  'wednesday': "You miss 100% of the shots you don’t take. \
  –Wayne Gretzky",
  'thursday': "Every strike brings me closer to the next home run. \
  –Babe Ruth",
  'friday': "We become what we think about. \
  –Earl Nightingale",
  'saturday': "Life is what happens to you while you’re busy making other plans. \
  –John Lennon",
}

app.post('/quote', function (req, res) {
  day = req.body.day_of_week;
  console.log("Received request for quote for day " + day);
  res.json({ 'day': day, 'quote': quote_db[day] });
});

var server = app.listen(3000, function () {
  console.log('Server on localhost listening on port 3000');
});
