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
          p.body-text Mondays & Wednesdays at Noon (EST)
          button
            i Sign up now!
    section
      aside
        img(alt='HTML only' src='../../assets/sliders/build.png')
        h3 HTML and You&apos;re Done
        p
          | MVP styles your root HTML elements, so you don&apos;t need to learn a new CSS framework or naming
          | conventions.
        p
          a(href='https://www.w3schools.com/TAGS/ref_byfunc.asp' target='_blank')
            em
              | HTML Guide
              | &nearr;
      aside
        img(alt='HTML only' src='../../assets/sliders/show.png')
        h3 Mobile-friendly UI
        p
          | MVP is designed to look great on all browsers and devices out of the box for rapid prototyping.
        p
          | It&apos;s like an amped up CSS reset that you can toss into any project to get decent styling.
      aside
        img(alt='HTML only' src='../../assets/sliders/repeat.png')
        h3 MIT License
        p
          | MVP is released under the permissive MIT license so you can freely use it however you&apos;d like.
        p
          | That means personal projects, commercial ventures, remixes and more are all welcome.
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
    width: 100%; display: inline;

    .image-wrapper {
      display: inline-block;
    }

    .content-wrapper {
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
