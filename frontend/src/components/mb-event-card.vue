<template lang="pug">
  mb-internal-link.w-full(:to="'/mb-event/' + id" style="margin: 0.5rem;")
    div._event-card.rounded.overflow-hidden.h-full.shadow-xl.hover_shadow-2xl.w-full
      div.w-full.relative(
        style="background-size: cover; background-position:center; height: 250px;"
        :style="{ backgroundImage: urlFor(image) }"
        )
        mb-a-button.absolute.z-99.right-0(
          v-if="isUpcoming && registerLink"
          isExternal
          :href="registerLink"
          @click.stop
        ) Register
      div.px-4.py-4.text-gray-700.lg_flex.lg_justify-between.items-center
        div.text-xl.mr-2 {{ eventTitle }}
        div.text-sm {{prettyESTDate(startTime)}}
</template>

<style lang="scss" scoped>
// @media only screen and (max-width: 638px) {
//   // ._event-card {
//   //   min-width: 250px;
//   // }
// }
</style>

<script>
import prettyESTDate from "../helpers/prettyDate";
import isUpcoming from "../helpers/isUpcoming";

export default {
  name: "mb-event-card",
  props: {
    id: String,
    image: String,
    eventTitle: String,
    startTime: String,
    endTime: String,
    registerLink: String
  },
  data() {
    return {
      isUpcoming: false
    };
  },
  methods: {
    cloudinaryUrlFor: function(id) {
      return `url(https://res.cloudinary.com/mintbean/image/upload/b_black,c_crop,h_225,w_400/${id})`;
    },
    // this is for dummy data only vvv
    // TODO: remove this after linking real MbEvents, use cloudinaryUrlFor instead
    urlFor: function(url) {
      return `url(${url})`;
    },
    prettyESTDate
  },
  mounted() {
    this.isUpcoming = isUpcoming(this.endTime) ? true : false;
  }
};
</script>
