<template lang="pug">
div
  img(:src="imgWelcome" alt="A group of creators getting ready to build something")



</template>

<script>
import imgWelcome from "../../assets/sliders/repeat.png";

export default {
  name: "Confirm",
  data() {
    return {
      imgWelcome
    };
  }
};
</script>
