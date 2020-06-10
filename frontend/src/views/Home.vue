<template lang="pug">
div
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
        p Mondays & Wednesdays at 12:00pm EST
        button(v-if="nextEvent" v-on:click.prevent="() => goToEvent(nextEvent.id)").u-pulse
          i Sign up for {{nextEvent.title}}!
        button(v-else v-on:click.prevent="() => $router.push('/auth/login')").u-pulse
          i Sign up now!
  
  main
    h3 Check out some great recent projects
    mb-project-grid(:projects="projects")

    h3 Here are some upcoming events.
    section.u-centered
      aside(v-for="mbEvent in mbEvents" class="hackathon-card" v-on:click.prevent="() => goToEvent(mbEvent.id)")
        img(:src="mbEvent.cover_image_url" max-height=300 width="100%")
        h3 {{mbEvent.title}}
        b(v-if="getEventStatus(mbEvent) === 'upcoming'")
          countdown(:time="getCountdownTime(mbEvent.start_time)")
            template(slot-scope="props") Starts In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        b(v-if="getEventStatus(mbEvent) === 'ongoing'")
          countdown(:time="getCountdownTime(mbEvent.end_time)")
            template(slot-scope="props") Ends In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        b(v-if="getEventStatus(mbEvent) === 'ended'")
          | Event Ended
        p {{mbEvent.description}}

    section.u-centered
      h3 Mintbean is getting glowing reviews from the community!
    section
      aside
        blockquote
          | Learned how to build a Chrome Extension. Participated in my first ever hackathon. Got familiar with the process. Enjoyed the heady rush of coding in a set timeframe. That's it in a nutshell!
          footer
            i - Posh G
      aside
        blockquote
          | I'm definitely coming back for another meet. I loved the exposure and the chance to break out of
          | my rut.
          footer
            i - M. Alaniz
</template>

<style lang="scss" scoped>
@import "../styles/colors";

.hero {
  justify-content: space-evenly;
  display: flex;
  margin-bottom: 50px;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, $least-minty 0%, rgba(255,255,255,1) 50%);
  text-align: left;
  background-color: $color-bg-secondary;
  padding: 100px;
  flex-wrap: wrap;;

  .left {
    align-content: center;;
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
    vertical-align: middle;;
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
  max-width: 1500px;
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
      return this.$store.state.mbEvents.find(mbEvent => this.getEventStatus(mbEvent) === "upcoming");
    },
    projects: function() {
      return this.$store.state.frontpageProjects;
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
    goToEvent: function(id) {
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
