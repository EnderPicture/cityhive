// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const fs = require("fs");
const fetch = require("node-fetch");
const helper = require("./.data/helper");

// instagram post data goes here
let instasgramData = {};

fs.readFile("./.data/data.json", "utf8", (err, data) => {
  if (err) {
    console.log("no data file");
  } else {
    instasgramData = JSON.parse(data).data.user.edge_owner_to_timeline_media
      .edges;
  }
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send instagram data to webpage
app.get("/instagram-data", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(instasgramData);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// get instagram data

let options = {
  method: "GET",
  headers: helper.header
};

fetch(helper.apiURL, options)
  .then(res => res.json()) // expecting a json response
  .then(json => {
    instasgramData = json.data.user.edge_owner_to_timeline_media.edges;

    let data = JSON.stringify(json);
    fs.writeFile("./.data/data.json", data, err => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  });
