fetch("/instagram-data")
  .then(response => response.json()) // parse the JSON from the server
  .then(data => {
    console.log(data);
  });
