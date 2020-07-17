<template lang="pug">
  div
    mb-banner(title="Events")
    div.container.m-auto.pt-24
      p events page
</template>


<script>
import moment from "moment";

// @ is an alias to /src
export default {
  name: "Events",
  methods: {
    fetchProjects() {
      const self = this;
      const { id } = this.$route.params;

      this.$mbContext.projectService
        .search({
          mbEventId: id,
          ratingCountMin: 0
        })
        .then(projects => {
          self.projects = projects;
        })
        .catch(e => {
          console.error(e);
          alert("Failed to fetch event");
        });
    },
  },
};
</script>
