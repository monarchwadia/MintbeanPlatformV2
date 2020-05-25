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
          button(v-on:click.prevent="goToUpcomingEvent").u-minty-gradient
            i(v-if="nextEvent") Sign up for {{nextEvent.title}}!
            i(v-else) Sign up now!
      
    blockquote
      | Learned how to build a Chrome Extension. Participated in my first ever hackathon. Got familiar with the process. Enjoyed the heady rush of coding in a set timeframe. That's it in a nutshell!
      footer
        i - Posh G
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
      | I'm definitely coming back for another meet. I loved the exposure and the chance to break out of
      | my rut.
      footer
        i - M. Alaniz
//- <div id="figure">
//-     <header>
//-         <h2>A decent MVP in no time</h2>
//-         <p>More building and less designing with "set and forget" styling.</p>
//-     </header>
//-     <figure>
//-         <img alt="Stock photo" src="./img/stock.jpg">
//-         <figcaption><i>"Uber for X" brainstorming session</i></figcaption>
//-     </figure>
//- </div>




//- div
//-   .hello
//-     h1 Mintbean Talent Incubator
//-     p We work to accelerate the careers, skillsets, and professional networks of software developers globally.
//-   .this-week
//-     h2 General Assembly Students & Alumni: Welcome to CareerHack Week!
//-     .hero
//-   div.leaderboard-wrapper
//-     left-panel
//-     right-panel
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
// .ga-hero {
//     min-height: 50vh;
//     width: 100%;
//     background-image: url("../../assets/ga-hero.png");
//     background-repeat: no-repeat;
//     // background-attachment: fixed;
//     background-position: center;
//     background-size: contain; 
// }
// @import "../../styles/colors";
// @import "../../styles/dimensions";
// @import "../../styles/mixins";

// .essential-links {
//   ul {
//     list-style-type: none;
//   }
//   li {
//     @include respond-to("small") {
//       display: inline-block;
//       width: 100%;
//       margin: vstep(1) hstep(0);
//     }
//     display: inline-block;
//     margin: vstep(3) hstep(2);
//   }
// }

// .this-week {
//   color: $lightest;
//   background-color: $darkest;
//   .hero {
//     min-height: 50vh;
//     width: 100%;
//     background-image: url("../../assets/ga-hero.png");
//     background-repeat: no-repeat;
//     // background-attachment: fixed;
//     background-position: center;
//     background-size: contain; 
//   }
// }

// .leaderboard-wrapper {
//   width: 100%;
//   background-color: $lightest;

//   & > * {
//     padding: vstep(12) hstep(12);
//     display: inline-block;
//   }

//   .left-panel {
//     width: 80%;
//   }
  
//   .right-panel {
//     width: 20%;
//     background-color: $blue;
//   }
// }
</style>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  computed: {
    nextEvent: function() {
      return this.$store.state.mbEvents && this.$store.state.mbEvents[0];
    }
  },
  methods: {
    goToUpcomingEvent: function() {
      this.$router.push('/mb-event/' + this.nextEvent.id)
    }
  }
};
</script>
