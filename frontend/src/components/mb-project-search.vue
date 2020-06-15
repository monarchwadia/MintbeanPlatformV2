<template lang="pug">
  div.mb-project-search
    aside.left
      label Search {{search.searchQuery}}
        input(type="text" v-model="search.searchQuery")
      label Best
        input(type="radio" id="RATING_AVERAGE" value="RATING_AVERAGE" v-model="search.sortField")
      label Popular
        input(type="radio" id="RATING_COUNT" value="RATING_COUNT" v-model="search.sortField")
      label Newest
        input(type="radio" id="CREATED_AT" value="CREATED_AT" v-model="search.sortField")
    
      label Minimum Number of Votes
        select(v-model="search.ratingCountMin")
          option 10
          option 9
          option 8
          option 7
          option 6
          option 5
          option 4
          option 3
          option 2
          option 1
          option 0
      label Minimum Average Rating
        select(v-model="search.ratingAverageMin")
          option 10
          option 9
          option 8
          option 7
          option 6
          option 5
          option 4
          option 3
          option 2
          option 1
          option 0
    aside.right
      div.video-container(:style="{ display: status.loading ? 'initial' : 'none' }").searching
        <video autoplay muted loop>
          <source :src="assets.searchVideo" type="video/mp4">
        </video>
      div.video-container(:style="{ display: (!status.loading && !projects.length) ? 'initial' : 'none' }") 
        <video autoplay muted loop>
          <source :src="assets.notFoundVideo" type="video/mp4">
        </video>
      mb-project-grid(:projects="projects")
</template>

<style lang="scss" scoped>
@import "../styles/utils";
@import "../styles/colors";

.mb-project-search {
  display: flex;
  flex-wrap: wrap;
  // grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  // justify-content: space-evenly;
  // column-gap: 5px;

  & > .left {
    min-width: 400px;
    flex-grow: 1;
  }

  & > .right {
    flex-grow: 6;
  }

  label {
    cursor: pointer;
    width: 100%;
  }

  input {
    cursor: pointer;
  }

  input[type="text"] {
    cursor: text;
    width: 100%;
  }

  input[type="number"] {
    width: 100px;
  }

}

.video-container {
  width: 100%;
  height: auto;
  video {
    display: block;
    margin: auto;
  }
}

</style>

<script>
import mbProjectGrid from "./mb-project-grid.vue";
import debounce from "../helpers/debounce";
import searchVideo from "../assets/search.mp4"
import notFoundVideo from "../assets/notFound.mp4"

// @ is an alias to /src
export default {
  name: "mb-project-search",
  data() {
    return {
      search: {
        searchQuery: '',
        sortField: 'CREATED_AT',
        sortDirection: 'desc',
        ratingCountMin: 8,
        ratingAverageMin: 8
      },
      status: {
        loading: false
      },
      projects: []
    };
  },
  components: {
    "mb-project-grid": mbProjectGrid
  },
  computed: {
    assets() {
      return { searchVideo, notFoundVideo }
    }
  },
  methods: {
    doSearch() {
      const self = this;

      self.projects = [];
      self.status.loading = true;
      this.debounce(() => self.doRequest())
    },
    doRequest() {
      const self = this;
      self.status.loading = true;

      this.$mbContext.projectService
        .search(this.search)
        .then(projects => {
          self.status.loading = false;
          self.projects = projects;
        })
        .catch(err => {
          self.status.loading = false;
          alert("Failed to fetch projects");
          console.error("Failed to fetch projects", err);
        });
    }
  },
  watch: {
    'search.searchQuery'(val) {
      this.doSearch()
    },
    'search.sortField'(val) {
      this.doSearch()
    },
    'search.sortDirection'(val) {
      this.doSearch()
    },
    'search.ratingCountMin'(val) {
      this.doSearch()
    },
    'search.ratingAverageMin'(val) {
      this.doSearch()
    }
  },
  mounted() {
    this.debounce = debounce();
    this.doRequest();

  // userId: string;
  // mbEventId: string;
  // ratingAverageMin: number;
  // ratingCountMin: number;
  // sortDirection: "asc" | "desc";
  // sortField: "CREATED_AT" | "RATING_AVERAGE" | "RATING_COUNT";
  // limit: number;
  // offset: number;


  }
};
</script>
