let instagramData = {};
fetch("/instagram-data")
  .then(response => response.json()) // parse the JSON from the server
  .then(data => {
    instagramData = data;
  });



const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')