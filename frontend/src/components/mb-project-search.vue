<template lang="pug">
  div.search
    div.search-section
      label.u-width-full Search {{search.searchString}}
        input.search-input(type="text" v-model="search.searchString")
    div.search-section
      b Sort By
      br
      label.inline Best Rated
        input(type="radio" id="ratingAverage" value="RATING_AVERAGE" v-model="search.sortBy")
      label.inline Most Voted
        input(type="radio" id="ratingAverage" value="RATING_COUNT" v-model="search.sortBy")
      label.inline Newest
        input(type="radio" id="ratingAverage" value="CREATED_AT" v-model="search.sortBy" default)
    div.search-section
      label Minimum Number of Votes
        input(type="number" v-model="search.ratingCountMin")
      label Minimum Average Rating
        input(type="number" v-model="search.ratingAverageMin")
          
    mb-project-grid(:projects="projects")
</template>

<style lang="scss" scoped>
@import "../styles/utils";
@import "../styles/colors";

.mb-project-search {
  .search-container {
    .search-section {

      label, input {
        max-width: none;
      }

      label.inline {
        margin: 0 25px 0 0;
      }

      input[type="text"] {
        width: 100%;
        max-width: 100%;
      }
      
      input[type="number"] {
        max-width: 50px;
      }
    }
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
        sortBy: 'CREATED_AT',
        direction: 'desc'
      },
      projects: []
    };
  },
  components: {
    "mb-project-grid": mbProjectGrid
  },
  methods: {
    doSearch() {
      this.debounce(() => {
        console.log('search', JSON.stringify(this.search));
      })
    }
  },
  watch: {
    'search.searchString'(val) {
      this.doSearch()
    },
    'search.sortBy'(val) {
      this.doSearch()
    },
    'search.direction '(val) {
      this.doSearch()
    }
  },
  mounted() {
    this.debounce = debounce();

  // userId: string;
  // mbEventId: string;
  // ratingAverageMin: number;
  // ratingCountMin: number;
  // sortDirection: "asc" | "desc";
  // sortField: "CREATED_AT" | "RATING_AVERAGE" | "RATING_COUNT";
  // limit: number;
  // offset: number;

    const self = this;
    this.$mbContext.projectService
      .search()
      .then(projects => (self.projects = projects))
      .catch(err => {
        alert("Failed to fetch projects");
        console.error("Failed to fetch projects", err);
      });
  }
};
</script>
