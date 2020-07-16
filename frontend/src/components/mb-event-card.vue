<template lang="pug">
  mb-internal-link.w-full(:to="'/mb-event/' + id")
    div.rounded.overflow-hidden.shadow-xl.hover_shadow-2xl.w-full
      div.w-full.relative(style="background-size: cover; height: 250px;" :style="{ backgroundImage: urlFor(cloudinaryPublicId) }")
        mb-a-button.absolute.z-99.right-0(isExternal :href="registerLink" @click.stop) Register
      div.px-4.py-4.text-gray-700.lg_flex.lg_justify-between.items-center
        div.text-xl.mr-2 {{ eventTitle }}
        div {{prettyDate(startTime) + ' (EST)'}}
</template>

<script>
import prettyDateHelper from '../helpers/prettyDate';

export default {
  props: ['id', 'cloudinaryPublicId', 'eventTitle', 'startTime', 'registerLink'],
  name: "mb-event-card",
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
}
</script>
