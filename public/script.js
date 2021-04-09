function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const App = {
  data() {
    return {
      instagramRawData: [],
      selected: {},
      tagGroups: [
        {
          name: "Type",
          tags: ["jobs"]
        },
        {
          name: "Program",
          tags: ["envirolab", "innovationlab", "virtualprogram"]
        },
        {
          name: "Tipics",
          tags: [
            "zerowaste",
            "circulareconomy",
            "civiceducation",
            "sustainability",
            "cityplanning",
            "climateaction",
            "climateemergency",
            "citiesforall",
            "communitybuilding",
            "culturalsharing",
            "localgovernment",
            "localclimateaction"
          ]
        },
        {
          name: "Skills",
          tags: []
        },
        {
          name: "Duration",
          tags: []
        },
        {
          name: "Location",
          tags: [
            "cityofvancouver",
            "richmondbc",
            "metrovancouver",
            "yvr",
            "northshore",
            "vancouver",
            "richmond"
          ]
        },
      ]
    };
  },
  computed: {
    instagramData() {
      return this.instagramRawData.map(post => {
        const caption = post.node.edge_media_to_caption.edges[0].node.text;
        let hashtags = caption.match(/#\w+/g);
        

        let title =
          hashtags === null
            ? "CithHive"
            : hashtags[0]
                .substring(1)
                .replace(/([A-Z])/g, " $1")
                .trim();
        title = toTitleCase(title);

        return {
          img: post.node.display_url,
          thumbnail: post.node.thumbnail_src,
          caption: caption,
          hashtags: hashtags === null ? [] : hashtags.map(tag => tag.substring(1).toLowerCase()),
          title: title,
          id: post.node.id,
          shortcode: post.node.shortcode
        };
      });
    },
    instagramDataFiltered() {
      if (Object.keys(this.selected).length === 0) {
        return this.instagramData;
      }

      // filter hashtags
      return this.instagramData.filter(post => {
        let selected = false;
        for (let tag in this.selected) {
          if (post.hashtags.indexOf(tag) > -1) {
            selected = true;
            break;
          }
        }
        return selected;
      });
      
      
    },
    hashtags() {
      let tags = {};
      this.instagramData.forEach(post => {
        if (post.hashtags !== null) {
          post.hashtags.forEach(hashTag => {
            if (tags[hashTag] === undefined) {
              tags[hashTag] = 0;
            }
            tags[hashTag]++;
          });
        }
      });

      let sorted = [];

      for (let key in tags) {
        sorted.push({
          name: key,
          count: tags[key]
        });
      }

      sorted.sort((a, b) => b.count - a.count);

      return sorted;
    }
  },
  watch: {
    instagramDataFiltered(after, before) {
      let afterIds = after.map(post => post.id);
      let beforeIds = before.map(post => post.id);

      // find the removed posts
      let removed = beforeIds.filter(id => afterIds.indexOf(id) < 0);

      removed.forEach(id => {
        let element = this.$refs[id];
        element.style.width = element.clientWidth + "px";
        element.style.height = element.clientHeight + "px";

        let absRect = element.getBoundingClientRect();
        let relRect = element.parentElement.getBoundingClientRect();

        element.style.left = absRect.left - relRect.left + "px";
        element.style.top = absRect.top - relRect.top + "px";
      });
    }
  },
  methods: {
    tagClicked(tag) {
      if (this.selected[tag] !== undefined) {
        delete this.selected[tag];
      } else {
        this.selected[tag] = true;
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
