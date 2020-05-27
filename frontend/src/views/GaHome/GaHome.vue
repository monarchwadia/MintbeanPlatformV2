<template lang="pug">
div
  //- main
  //-   header
  //-     figure
  //-       img(alt="GA Mintbean CreerHack Week, May 26 - June 1" class="ga-hero" src="../../assets/ga-hero.png")
  //-       p
  //-         b Welcome!
  main
    section.call-to-action-outer
      aside.call-to-action-inner
        div.image-wrapper
          img(src='../../assets/logo.png')
        div.content-wrapper
          p.header-text The next hackathon is around the corner!
          p.body-text Mondays & Wednesdays at 12:00pm EST
          button(v-if="nextEvent" v-on:click.prevent="() => goToUpcomingEvent(nextEvent.id)").u-minty-gradient
            i Sign up for {{nextEvent.title}}!
          button(v-else v-on:click.prevent="() => $router.push('/auth/login')").u-minty-gradient
            i Sign up now!
    section.u-centered
      aside
        img(alt='HTML only' src='../../assets/sliders/build.png')
        h3 Write code.
        p
          | Join our easy, low-pressure 4-hour hackathons to fill your portfolio with beautiful, eye-catching projects that will impress potential employers and wow your friends.
      aside.u-centered
        img(alt='HTML only' src='../../assets/sliders/show.png')
        h3 Get noticed.
        p
          | Your portfolio is your #1 weapon when it comes to finding a job. Don't keep it a secret! We help you market
          | yourself through systematic social media marketing workshops. 
      aside.u-centered
        img(alt='HTML only' src='../../assets/sliders/repeat.png')
        h3 Get hired.
        p
          | We market you directly to employers through our job board, newsletters, portfolios platform and social media channels so employers can get in touch with you easily.
    blockquote
      | Learned how to build a Chrome Extension. Participated in my first ever hackathon. Got familiar with the process. Enjoyed the heady rush of coding in a set timeframe. That's it in a nutshell!
      footer
        i - Posh G

    section
      h2 Coming Up Next:

    section.u-centered
      aside(v-for="mbEvent in mbEvents" class="hackathon-card" v-on:click.prevent="() => goToUpcomingEvent(mbEvent.id)")
        img(:src="mbEvent.cover_image_url" max-height=300 width="100%")
        h3 {{mbEvent.title}}
        p {{mbEvent.description}}
        b(v-if="getEventStatus(mbEvent) === 'upcoming'")
          countdown(:time="getCountdownTime(mbEvent.start_time)")
            template(slot-scope="props") Starts In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        b(v-if="getEventStatus(mbEvent) === 'ongoing'")
          countdown(:time="getCountdownTime(mbEvent.start_time)")
            template(slot-scope="props") Ends In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        b(v-if="getEventStatus(mbEvent) === 'ended'")
          | Event Ended

    blockquote
      | I'm definitely coming back for another meet. I loved the exposure and the chance to break out of
      | my rut.
      footer
        i - M. Alaniz

</template>

<style lang="scss" scoped>
.call-to-action-outer {
  .call-to-action-inner {
    width: 100%;
    display: inline;

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
  }
};
</script>
