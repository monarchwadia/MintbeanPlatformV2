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
          button.u-minty-gradient
            i Sign up now!
    section.u-centered
      aside
        img(alt='HTML only' src='../../assets/sliders/build.png')
        h3 Write code.
        p
          | Fill your portfolio with beautiful, eye-catching projects in 4-hour hackathons. Create beautiful projects that will impress
          | your friends, loved ones, and potential employers.
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
          | Our job boards, newsletters, social media channels and direct marketing efforts put employers directly in touch with you based on the contents of your developer portfolio.
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
        font-style: italic;
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
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    "left-panel": LeftPanel,
    "right-panel": RightPanel
  }
};
</script>
