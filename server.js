// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const fetch = require("node-fetch");
const helper = require("./.data/helper");

// our default array of dreams
const instasgramData = {};

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/instagram-data", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(instasgramData);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let options = {
  method: "GET",
  headers: helper.header
};

fetch(helper.apiURL, options)
  .then(res => res.json()) // expecting a json response
  .then(json => instasgramData);
