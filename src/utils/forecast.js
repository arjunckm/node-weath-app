const request = require("request");

const forecast = (lati, longi, callback) => {
  const url =
    "https://api.darksky.net/forecast/348b10487b43671d26aeba143e8c99eb/" +
    lati +
    "," +
    longi +
    "?units=si&lang=en";
  //console.log(url);
  request({ url, json: true }, (error, { body }) => {
    //console.log(body);
    if (error) {
      callback("Unable to connect to weather server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees Celsius out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
