<template lang="pug">
  div.rounded.shadow-xl.hover_shadow-2xl(style="width: 400px;")
    div(class="w-full" style="height: 225px; width: 400px;" :style="{ backgroundImage: cloudinaryUrlFor(cloudinaryPublicId) }")
    div.px-6.py-4.text-gray-700.flex.flex-col.justify-between
      div.text-xl {{ projectTitle }}
      div.text-md.mb-2 by {{ authorName }}
      div.text-gray-700.text-base.my-5(style="min-height: 60px; max-height: 60px; height: 60px;") {{ description }}
      mb-internal-link(:to="'/project/' + id") View
      div.flex.justify-left
          div.inline-block.bg-gray-200.rounded-full.px-3.py-1.text-sm.font-semibold.text-gray-700.mr-2(v-for="tag in tags") {{`#${tag}`}}
</template>

<script>
export default {
  props: ['id', 'cloudinaryPublicId', 'projectTitle', 'authorName', 'description', 'tags', 'disableClick'],
  name: "mb-project-card",
  methods: {
    cloudinaryUrlFor: function(id) {
      return `url(https://res.cloudinary.com/mintbean/image/upload/b_black,c_crop,h_225,w_400/${id})`;
    }
  },
}
</script>
