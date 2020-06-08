<template lang="pug">
div
  header.hero
    h1 Write code. Get noticed. Get hired.
    p At Mintbean, you can build & showcase projects, get noticed, and find jobs.
  
  main
    h3 Check out some great recent projects
    mb-project-grid

    section.call-to-action-outer
      aside.call-to-action-inner
        div.inner-wrapper
          div.image-wrapper
            mb-image-display(serverId="c58b49717bb0118438ee4a47e4ed2038")
            img.signup-bean(src='../assets/logo.png')
          div.content-wrapper
            p.header-text The next hackathon is around the corner!
            p.body-text Mondays & Wednesdays at 12:00pm EST
            button(v-if="nextEvent" v-on:click.prevent="() => goToEvent(nextEvent.id)").u-minty-gradient.u-pulse
              i Sign up for {{nextEvent.title}}!
            button(v-else v-on:click.prevent="() => $router.push('/auth/login')").u-minty-gradient.u-pulse
              i Sign up now!

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

.call-to-action-outer {
  margin-top: 100px;
  margin-bottom: 100px;

  .call-to-action-inner {
    width: 100%;

    .inner-wrapper {
      display: block;
      width: 100%;
      max-width: 1000px;
      margin: auto;
  
      .image-wrapper {
        display: inline-block;
      }
  
      .content-wrapper {
        max-width: 100%;
        display: inline-block;
        vertical-align: top;
  
        .header-text {
          font-size: xx-large;
          font-weight: 900;
        }
  
        .body-text {
          font-size: x-large;
        }
      }
    }
  }
}

.signup-bean {
  padding: 0 50px;
}

.hackathon-card {
  cursor: pointer;
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
