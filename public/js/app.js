const weatherData = (addressurl, callback) => {
  fetch(addressurl).then(response => {
    response.json().then(data => {
      if (data.error) {
        callback(data.error, undefined);
      } else {
        callback(undefined, {
          forecast: data.forecast,
          location: data.location
        });
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageone = document.querySelector("#messageone");
const messagetwo = document.querySelector("#messagetwo");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const locationAdd = search.value;
  const url = "http://localhost:3000/weather?address=" + locationAdd;
  messageone.textContent = "Loading....";
  messagetwo.textContent = "";
  weatherData(url, (error, { forecast, location } = {}) => {
    if (error) {
      messageone.textContent = error;
    } else {
      messageone.textContent = "Location: " + location;
      messagetwo.textContent = "Forecast: " + forecast;
    }
  });
});
