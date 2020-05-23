<template lang="pug">
  div
    .hello
      h1 Mintbean Talent Incubator
      p We work to accelerate the careers, skillsets, and professional networks of software developers globally.
    .this-week
      h2 General Assembly Students & Alumni: Welcome to CareerHack Week!
      .hero
    div.leaderboard-wrapper
      left-panel
      right-panel
</template>

<style lang="scss" scoped>
@import "../../styles/colors";
@import "../../styles/dimensions";
@import "../../styles/mixins";

.essential-links {
  ul {
    list-style-type: none;
  }
  li {
    @include respond-to("small") {
      display: inline-block;
      width: 100%;
      margin: vstep(1) hstep(0);
    }
    display: inline-block;
    margin: vstep(3) hstep(2);
  }
}

.this-week {
  color: $lightest;
  background-color: $darkest;
  .hero {
    min-height: 50vh;
    width: 100%;
    background-image: url("../../assets/ga-hero.png");
    background-repeat: no-repeat;
    // background-attachment: fixed;
    background-position: center;
    background-size: contain; 
  }
}

.leaderboard-wrapper {
  width: 100%;
  background-color: $lightest;

  & > * {
    padding: vstep(12) hstep(12);
    display: inline-block;
  }

  .left-panel {
    width: 80%;
  }
  
  .right-panel {
    width: 20%;
    background-color: $blue;
  }
}
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
