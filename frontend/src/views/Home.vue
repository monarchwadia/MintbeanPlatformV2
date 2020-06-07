<template lang="pug">
main
  mb-project-grid

</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  
  .grid-item {
    gap: 1rem;
  }
}
</style>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  computed: {
    mbEvents: function() {
      return this.$store.state.mbEvents || [];
    },
    nextEvent: function() {
      return this.$store.state.mbEvents && this.$store.state.mbEvents[0];
    }
  },
  methods: {
    getEventStatus(mbEvent) {
      const timeToStart = new Date(mbEvent.start_time) - new Date();
      const timeToEnd = new Date(mbEvent.end_time) - new Date();

      if (timeToStart > 0) {
        return "upcoming";
      } else {
        if (timeToEnd > 0) {
          return "ongoing";
        } else {
          return "ended"
        }
      }
    },
    getCountdownTime: function(mbEventStartTime) {
      return new Date(mbEventStartTime) - new Date()
    },
    goToUpcomingEvent: function(id) {
      if (id) {
        this.$router.push('/mb-event/' + id)
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchFrontpageProjects');
  }
};
</script>
