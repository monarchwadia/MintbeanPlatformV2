<template lang="pug">
  div.mb-project-search
    aside.left
      label Search {{search.searchString}}
        input(type="text" v-model="search.searchString")
      b Sort By
      label Newest
        input(type="radio" id="CREATED_AT" value="CREATED_AT" v-model="search.sortField")
      label Best Rated
        input(type="radio" id="RATING_AVERAGE" value="RATING_AVERAGE" v-model="search.sortField")
      label Most Voted
        input(type="radio" id="RATING_COUNT" value="RATING_COUNT" v-model="search.sortField")
    
      label Minimum Number of Votes
        input(type="number" v-model="search.ratingCountMin")
      label Minimum Average Rating
        input(type="number" v-model="search.ratingAverageMin")
    aside.right
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
    box-sizing: border-box;
    width: 100%;
  }

  input {
    box-sizing: border-box;
  }

  input[type="text"] {
    width: 100%;
  }

  input[type="number"] {
    width: 100px;
  }
}


</style>

<script>
import mbProjectGrid from "./mb-project-grid.vue";
import debounce from "../helpers/debounce";

// @ is an alias to /src
export default {
  name: "mb-project-search",
  data() {
    return {
      search: {
        searchString: '',
        sortField: 'CREATED_AT',
        sortDirection: 'desc',
        ratingCountMin: 4,
        ratingAverageMin: 8
      },
      projects: []
    };
  },
  components: {
    "mb-project-grid": mbProjectGrid
  },
  methods: {
    doSearch() {
      const self = this;
      this.debounce(() => self.doRequest())
    },
    doRequest() {
      const self = this;
      this.$mbContext.projectService
        .search(this.search)
        .then(projects => (self.projects = projects))
        .catch(err => {
          alert("Failed to fetch projects");
          console.error("Failed to fetch projects", err);
        });
    }
  },
  watch: {
    'search.searchString'(val) {
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
