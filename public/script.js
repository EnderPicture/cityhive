const App = {
  data() {
    return {
      instagramRawData: []
    };
  },
  computed: {
    instagramData() {
      return this.instagramRawData.map(post => {
        const caption = post.node.edge_media_to_caption.edges[0].node.text;
        
        return {
          img: post.node.display_url,
          thumbnail: post.node.thumbnail_src,
          caption: caption,
          hashTags: caption.match(/#\w+/g),
        };
      });
    },
    hashtags() {
      let tags = {};
      this.instagramData.forEach(post => {
        if (post.hashTags !== null) {
        post.hashTags.forEach(hashTag => {
          if (tags[hashTag] === undefined) {
            tags[hashTag] = 1;
          }
          tags[hashTag]++;
        });
      });
      return tags;  
        }
        
    }
  },
  created() {
    fetch("/instagram-data")
      .then(response => response.json()) // parse the JSON from the server
      .then(data => {
        this.instagramRawData.push(...data);
      });
  }
};

Vue.createApp(App).mount("#app");
