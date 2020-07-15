<template lang="pug">
  mb-internal-link(:to="'/mb-event/' + id")
    div.rounded.overflow-hidden.shadow-xl.hover_shadow-2xl(style="width: 500px;")
      div.w-full.relative(style="background-size: cover; height: 225px;" :style="{ backgroundImage: urlFor(cloudinaryPublicId) }")
        mb-a-button.absolute.z-99.right-0.gradient-blue-mint.text-white.p-2.hover_shadow-md(isExternal :href="registerLink" @click.stop) Register
      div.px-6.py-4.text-gray-700.flex.justify-between
        div.text-xl {{ eventTitle }}
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
