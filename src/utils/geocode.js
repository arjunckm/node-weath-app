const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXJqdW5ja20iLCJhIjoiY2lpZzdveXd3MDI2dHR2a3IwZjZ0ajNscyJ9.C_AN8aMzQ05G9128nvo1Jg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    // console.log(body);
    if (error) {
      callback("Unable to connect to geocode server", undefined);
    } else if (body.message) {
      callback("Not Found", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the geocode for give location", callback);
    } else {
      //console.log(body.features[0].center);
      callback(undefined, {
        lats: body.features[0].center[1],
        longs: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
