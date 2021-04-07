const App = {
  data() {
    return {
      instagramRawData: [],
    };
  },
  compuated: {
    instagramData() {
      instagramRawData.map(post => {
        return {
          
        };
      });
      return [];
    },
    hashtags() {
      let array = [];
      this.instagramData.forEach(post => {
        text = 
        .match(/#\w+/g)
      });
      return array;
    }
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
