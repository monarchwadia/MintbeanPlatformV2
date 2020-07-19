<template lang="pug">
  mb-internal-link.w-full(:to="'/mb-event/' + id" style="margin: 0.5rem;")
    div.rounded.overflow-hidden.h-full.shadow-xl.hover_shadow-2xl.w-full
      div.w-full.relative(
        style="background-size: cover; height: 250px;"
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
        div.text-sm {{prettyDate(startTime) + ' (EST)'}}
</template>

<script>
import prettyDateHelper from "../helpers/prettyDate";
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
    prettyDate: prettyDateHelper
  },
  mounted() {
    this.isUpcoming = isUpcoming(this.endTime) ? true : false;
  }
};
</script>
