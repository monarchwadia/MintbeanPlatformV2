<template lang="pug">
div
  header.hero
    h1 Write code. Get noticed. Get hired.
    p At Mintbean, you can build & showcase projects, get noticed, and find jobs.
  
  main
    h3 Upcoming events
    mb-project-grid

    h3 Here are some upcoming events.

</template>

<style lang="scss" scoped>
@import "../styles/colors";

.hero {
  margin-bottom: 50px;
  background: rgb(255,255,255);
  background: linear-gradient(195deg, rgba(255,255,255,1) 0%, $basemint 100%);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  
  .grid-item {
    gap: 1rem;
  }
}

header {
  text-align: left;
  background-color: var(--color-bg-secondary);
  padding: 100px;
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
