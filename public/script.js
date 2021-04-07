const App = {
  data() {
    return {
      instagramRawData: [],
      selected: [],
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
          hashtags: caption.match(/#\w+/g)
        };
      });
    },
    instagramDataFiltered() {
      if (this.selected.length === 0) {
        return this.instagramData;
      }
      
      return this.instagramData.filter(post => {
        let selected = false;
        for (let index in this.selected) {
          
        }
      });
    },
    hashtags() {
      let tags = {};
      this.instagramData.forEach(post => {
        if (post.hashtags !== null) {
          post.hashtags.forEach(hashTag => {
            if (tags[hashTag] === undefined) {
              tags[hashTag] = 1;
            }
            tags[hashTag]++;
          });
        }
      });
      
      let sorted = [];
      
      for (let key in tags) {
        sorted.push({
          name: key,
          count: tags[key],
        })
      }
      
      sorted.sort((a,b) => b.count - a.count);
      
      return sorted;
    }
  },
  methods: {
    tagClicked(index) {
      if (this.selected[index] !== undefined) {
        delete this.selected[index]
      } else {
        this.selected[index] = true;
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
