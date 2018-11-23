require('dotenv').config();
const request = require('request');
const _ = require("lodash");
const yargs = require('yargs');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_GEOCODE_API_KEY}&address=${encodeURIComponent(argv.address)}`;

request({
  url: encodedAddress,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log("Can't connect to google servers.")
  } else if (body.status === 'ZERO_RESULTS') {
    console.log("No results found.")
  } else if (body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  } else {
    console.log('Something went wrong');
  }
});
