<template lang="pug">
div
  //- mb-modal(:display="showSearchProjectsModal" v-on:close="closeSearchProjectsModal()")
  //-   mb-project-search
  header.hero
    div.left
      h1 Write code.
      h1 Get noticed.
      h1 Get hired.
      p Come for the jobs. Stay for the community.
    div.right
      div
        mb-image-display(serverId="c58b49717bb0118438ee4a47e4ed2038")
        img.signup-bean(src='../assets/bean.png')
      div
        h1 The next hackathon is around the corner!
        p Frontend & Full Stack Hackathons
        p Mondays & Wednesdays at 12:00pm EST
        mb-a(href="https://www.eventbrite.ca/o/mintbean-28752300031")
          button.u-pulse Sign up now!
  
  main
    h3 Featured Projects
    mb-project-search(show-search-panel=false)

    h3 Past events.
    section.u-centered
      aside(v-for="mbEvent in mbEvents" class="hackathon-card" v-on:click.prevent="() => goToEvent(mbEvent.id)")
        img(:src="mbEvent.cover_image_url" max-height=300 width="100%")
        h3 {{mbEvent.title}}
        //- b(v-if="getEventStatus(mbEvent) === 'upcoming'")
        //-   countdown(:time="getCountdownTime(mbEvent.start_time)")
        //-     template(slot-scope="props") Starts In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        //- b(v-if="getEventStatus(mbEvent) === 'ongoing'")
        //-   countdown(:time="getCountdownTime(mbEvent.end_time)")
        //-     template(slot-scope="props") Ends In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        //- b(v-if="getEventStatus(mbEvent) === 'ended'")
        //-   | Event Ended
        p {{mbEvent.description}}
</template>

<style lang="scss" scoped>
@import "../styles/colors";

button {
  outline: none;
}

.hero {
  justify-content: space-evenly;
  display: flex;
  margin-bottom: 50px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    $least-minty 0%,
    rgba(255, 255, 255, 1) 50%
  );
  text-align: left;
  background-color: $color-bg-secondary;
  padding: 100px;
  flex-wrap: wrap;

  .left {
    align-content: center;
    min-width: 350px;
    h1 {
      font-size: 3.5em;
      padding: 0 0;
      margin: 0;
    }
  }

  .right {
    width: 600px;
    min-width: 350px;
    display: flex;
    vertical-align: middle;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  .grid-item {
    gap: 1rem;
  }
}

.signup-bean {
  padding: 0 50px;
}

.hackathon-card {
  cursor: pointer;
}

main {
  max-width: 100%;
}
</style>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      projects: [],
      showSearchProjectsModal: false
    };
  },
  computed: {
    mbEvents: function() {
      return this.$store.state.mbEvents || [];
    },
    nextEvent: function() {
      return this.$store.state.mbEvents.find(
        mbEvent => this.getEventStatus(mbEvent) === "upcoming"
      );
    }
  },
  methods: {
    openSearchProjectsModal() {
      this.showSearchProjectsModal = true;
    },
    closeSearchProjectsModal() {
      this.showSearchProjectsModal = false;
    },
    getEventStatus(mbEvent) {
      const timeToStart = new Date(mbEvent.start_time) - new Date();
      const timeToEnd = new Date(mbEvent.end_time) - new Date();

      if (timeToStart > 0) {
        return "upcoming";
      } else {
        if (timeToEnd > 0) {
          return "ongoing";
        } else {
          return "ended";
        }
      }
    },
    getCountdownTime: function(mbEventStartTime) {
      return new Date(mbEventStartTime) - new Date();
    },
    goToEvent: function(id) {
      if (id) {
        this.$router.push("/mb-event/" + id);
      }
    }
  },
  mounted() {
    const self = this;
    this.$mbContext.projectService
      .search()
      .then(results => {
        self.projects = results;
      })
      .catch(e => {
        console.error("Failed to fetch frontpage projects", e);
      });
  }
};
</script>
