<template lang="pug">
div.mb-project-grid-item
  div.inner
    div.overlay
    mb-image-display(:publicId="cloudinaryPublicIdFor(project)" height="500" width="350")
    div.user
      | {{ username }}
</template>

<style lang="scss" scoped>
.mb-project-grid-item {
  .inner {
    box-shadow: 6px 12px 25px var(--color-border);
    border-radius: 15px;
    overflow: hidden;
    width: 400px;
    height: 300px;
    position: relative;

    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      transition: opacity 0.5s;
      cursor: pointer;
      background: linear-gradient(180deg, rgba(237,2,2,0) 0%, rgba(0,0,0,0.8) 100%);
      opacity: 0;

      &:hover {
        // background-color: rgba(255,255,255,0.5);
        opacity: 0.6;
      }

    }
    .user {
      position: absolute;
      bottom: 0;
      left: 10px;
    }
  }
}


</style>

<script>
export default {
  name: "MbProjectGridItem",
  props: ['project'],
  computed: {
    username() {
      return this.project.User.firstname + ' ' + this.project.User.lastname;
    }
  },
  methods: {
    cloudinaryPublicIdFor(project) {
      return project && project.MediaAssets && project.MediaAssets[0] && project.MediaAssets[0].cloudinaryPublicId;
    }
  },
};
</script>
