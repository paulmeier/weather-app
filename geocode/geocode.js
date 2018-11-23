require('dotenv').config();
const request = require('request');

var geocodeAddress = (address, callback) => {
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_GEOCODE_API_KEY}&address=${encodeURIComponent(address)}`,
  json: true
}, (error, response, body) => {
  if (error) {
    callback("Can't connect to google servers.");
  } else if (body.status === 'ZERO_RESULTS') {
    callback("No results found.");
  } else if (body.status === 'OK') {
    callback(undefined, {
      address: body.results[0].formatted_address,
      latitude: body.results[0].geometry.location.lat,
      longitude: body.results[0].geometry.location.lng
    });
  } else {
    callback('Something went wrong');
  }
})};

module.exports = { geocodeAddress };
