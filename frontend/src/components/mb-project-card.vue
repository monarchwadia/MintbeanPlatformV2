<template lang="pug">
  div.rounded.shadow-xl.hover_shadow-2xl(style="width: 400px;")
    //- div.w-full(style="height: 225px; width: 400px;" :style="{ backgroundImage: cloudinaryUrlFor(cloudinaryPublicId) }")
    mb-image-display(:publicId="cloudinaryPublicId" height="225" width="400" crop="fill" style="width:400px; height: 225px;")
    div.px-6.py-4.text-gray-700.flex.flex-col.justify-between
      div.text-xl.mb-2 {{ projectTitle }}
      div.text-md.mb-2.flex.items-center
        mb-avatar.mr-1(size="sm")
        | {{ authorName }}
      div.hidden.text-gray-700.text-base.my-5(style="min-height: 60px; max-height: 60px; height: 60px;") {{ description }}
      mb-internal-link(:to="'/project/' + id")
        mb-button.float-right View
      div.flex.justify-left
        div.inline-block.bg-gray-200.rounded-full.px-3.py-1.text-sm.font-semibold.text-gray-700.mr-2(v-for="tag in tags") {{`#${tag}`}}
</template>

<script>
export default {
  props: [
    "id",
    "cloudinaryPublicId",
    "projectTitle",
    "authorName",
    "description",
    "tags",
    "disableClick"
  ],
  name: "mb-project-card",
  methods: {
    cloudinaryUrlFor: function(id) {
      return `url(https://res.cloudinary.com/mintbean/image/upload/b_black,c_crop,h_225,w_400/${id})`;
    }
  }
};
</script>
