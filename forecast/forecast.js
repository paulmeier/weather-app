require('dotenv').config();
const request = require('request');

var addressCurrTempature = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        tempature: body.currently.temperature,
      });
    } else {
      callback("Unable to fetch weather data.");
    }
  });
}

module.exports = { addressCurrTempature };
