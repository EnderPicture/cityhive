// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const fetch = require("node-fetch");

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let options = {
  method: "GET",
  headers: {
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6",
    "cache-control": "no-cache",
    cookie:
      "ig_did=7B4AA73B-1F59-4426-A773-83A542B61077; mid=XjIAbAALAAGqSbnpPqtFzhQRCOi3; fbm_124024574287414=base_domain=.instagram.com; ig_nrcb=1; shbid=939; shbts=1617687871.6728568; ds_user_id=39527125074; csrftoken=aFjHBi82iU25CFcaKVaCFHe19EobgAAm; sessionid=39527125074%3A8lL7M8HdwpIwWl%3A14; rur=PRN; fbsr_124024574287414=_2EnOixLCzynGEc3q9zM5NcB2aveSZeF4SnknzQIBkI.eyJ1c2VyX2lkIjoiMTAwMDAwNjQ0ODA1MjM1IiwiY29kZSI6IkFRQUlzV3FZcGRrZVJWTWQ4Z2s3bHlmamk1bnY3Zmh5SFJ3U3ZoeWg4RFhpci1DNldobFlOQlFVN0ZLUnc2Ni1vRG03aEJaR0xIYndOdk00dm9ZaGdIcjdNVVZrU2dSN3dvcXEzYTVpbVA4LWRHXzg4VWpmTDhwODRybmFad0dzZnVLSDRmNmpXMkVjOVBrT2djWXJrM2tJUkxaVDZRNF9OTGl4Mm5sV0RnVkxsN1d4RUV5cTN4dWJnbkFwRG1GdXM2WE5LUWdJYUFnTlZEbDRBMVlla096ZDNYY2ZVcGd3amctSDFvWFdxYmdPRUctQ3lqR2VSUUxkRkF1aGtlZVhwZUFTaDkzelEtOVVfSGlqbWl4YmF4eHByajE3b0JGUm5HR2Zac3E5T195V2doSTVPT3psNEw2NlJRMjFxNmdHNkM4Iiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJITjlyMnZMVDRaQjVWZTRiTUIwSE1YcmZtTXI1Z1VueFBVTGlXSUZSU0gyaVUzaEJzeGNHVVpDYmZzUWV0cUJ5ME5SVzd2dFFERVpCYTNaQmoycnVYWkI2Z3VaQm00cGljYUNFOGRjQlBlcnRaQ1FFMHgzMHMzREdiekEzQlpCWkFRSVpBVk5ncm5VdVYyVDNZWkNkZ1pBbHpMbHlaQUJPWG12NUdSMEtaQWFsTmJJbyIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE3ODI2MTU3fQ",
    pragma: "no-cache",
    referer: "https://www.instagram.com/cityhivevan/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68",
    "x-csrftoken": "aFjHBi82iU25CFcaKVaCFHe19EobgAAm",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR1kQsEJzXlj1rVBlGD8Y2pDtiXI7Zd7dVs9Ig5W4AMjE2wh",
    "x-requested-with": "XMLHttpRequest"
  }
};

fetch(
  "https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=9270148917&first=50",
  options
)
  .then(res => res.json()) // expecting a json response
  .then(json => console.log(json));
