const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;
//define paths
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//config for handelbars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//generic path setup
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Arjun JS"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    pic: "img/me.jpg",
    name: "Arjun JS"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Weather App ",
    message: "Help document of weather app will be displayed here",
    name: "Arjun JS"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address to continue"
    });
  }
  geocode(req.query.address, (error, { lats, longs, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(lats, longs, (error, weatherData) => {
      if (error) {
        return res.send({
          error: error
        });
      }
      res.send({
        forecast: weatherData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provid search result"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Arjun JS",
    errorText: "Help article Not Found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Arjun JS",
    errorText: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("server live on port " + port);
});
