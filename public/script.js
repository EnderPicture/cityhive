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
      radioGroups: [
        {
          question: "Are you currently in",
          tags: ["highschool", "undergraduate", "graduate"]
        },
        {
          question: "What’s your availability?",
          tags: ["alldays", "weekdays", "weekends"]
        }
      ],
      tagGroups: [
        {
          name: "Type",
          tags: ["Events", "Jobs"]
        },
        {
          name: "Program",
          tags: ["Innovation Lab", "Civic Education"]
        },
        {
          name: "Topics",
          tags: [
            "Youth Led",
            "Zero Waste",
            "Circular Economy",
            "Sustainability",
            "City Planning",
            "Climate Action",
            "Climate Emergency",
            "Cities For All",
            "Community Building",
            "Cultural Sharing",
            "Local Government",
            "Local Climate Action"
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
            "City of Vancouver",
            "Richmondbc",
            "Metro Vancouver",
            "YVR",
            "North Shore",
            "Vancouver",
            "Richmond"
          ]
        }
      ],
      navLinks: [
        { name: "HOME", url: "" },
        { name: "ABOUT", url: "" },
        { name: "PROGRAMS", url: "" },
        { name: "WORK WITH US", url: "" },
        { name: "WHAT’S NEW", url: "" },
        { name: "CONTACT US", url: "" }
      ]
    };
  },
  computed: {
    selectedEmpty() {
      return Object.keys(this.selected).length < 1;
    },
    instagramData() {
      return this.instagramRawData.map((post, index) => {
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

        hashtags =
          hashtags === null
            ? []
            : hashtags.map(tag => tag.substring(1).toLowerCase());

        if (Math.floor(Math.random() * 2) === 0) {
          hashtags.push("events");
        }
        if (hashtags.indexOf("envirolab") > -1) {
          hashtags.push("innovationlab");
        }

        let postObj = {
          img: post.node.display_url,
          thumbnail: post.node.thumbnail_src,
          caption: caption,
          hashtags: hashtags,
          title: title,
          id: post.node.id,
          shortcode: post.node.shortcode
        };

        return postObj;
      });
    },
    instagramDataFiltered() {
      if (Object.keys(this.selected).length === 0) {
        return this.instagramData;
      }

      // filter hashtags
      return this.instagramData.filter(post => {
        let selected = true;
        for (let tag in this.selected) {
          if (
            post.hashtags.indexOf(tag.replaceAll(" ", "").toLowerCase()) < 0
          ) {
            selected = false;
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
    },
    reset() {
      for (let key in this.selected) {
        delete this.selected[key];
      }
    },
    dropDownClicked() {
      
    },
    radioClicked(raioGroup, tag) {
      raioGroup.open = false;

      raioGroup.tags.forEach(tag => {
        if (this.selected[tag] !== undefined) {
          delete this.selected[tag];
        }
      });

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
