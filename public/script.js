const App = {
  data() {
    return {
      instagramData: [],
    };
  },
  created() {
    fetch("/instagram-data")
      .then(response => response.json()) // parse the JSON from the server
      .then(data => {
        this.instagramData.push(...data);
      });
  }
};

Vue.createApp(App).mount("#app");
