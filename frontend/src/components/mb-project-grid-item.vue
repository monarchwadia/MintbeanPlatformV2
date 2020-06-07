<template lang="pug">
div.mb-project-grid-item
  div.inner
    div.screenshot
      div.overlay
        div.project-title {{ project.title }}
      mb-image-display(:publicId="cloudinaryPublicIdFor(project)" height="500" width="350")
    div.user
      | {{ username }}
</template>

<style lang="scss" scoped>

// $width: 400px;
// $user-margin: 10px;
// $user-height: 75px - $user-margin;
// $screenshot-height: 300px - $user-margin;
// $height: $screenshot-height + $user-height;
// $border-radius: 15px;
// $background-color: white;

$text-left: 25px;
$text-right: 25px;
$width: 400px;
$screenshot-height: 300px;
$gap: 10px;
$user-height: 50px;
$height: $screenshot-height + $gap + $user-height;
$border-radius: 6px;
$background-color: white;

.mb-project-grid-item {
  .inner {
    cursor: pointer;
    width: $width;
    height: $height;
    margin: auto;
    position: relative;
    background-color: $background-color;

    .screenshot {
      overflow: hidden;
      box-shadow: 6px 12px 25px var(--color-border);
      border-radius: $border-radius;
      height: $screenshot-height;
      width: $width;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: $background-color;

      .overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        transition: opacity 0.5s;
        background: linear-gradient(180deg, rgba(237,2,2,0) 0%, rgba(0,0,0,0.8) 100%);
        opacity: 0;

        .project-title {
          position: absolute;
          bottom: 10px;
          font-weight: bold;;
          color: white;
          left: $text-left;
          right: $text-right;
          text-overflow: ellipsis;
        }
  
        &:hover {
          // background-color: rgba(255,255,255,0.5);
          opacity: 0.8;
        }
  
      }
    }

    .user {
      position: absolute;
      bottom: 0;
      left: 0px;
      width: $width;
      margin: auto;
      height: $user-height;
      line-height: $user-height;
      text-overflow: ellipsis;
      border-radius: $border-radius;
      box-shadow: 6px 12px 25px var(--color-border);
      z-index: 1001;
      background-color: $background-color;
      padding-left: $text-left;
      padding-right: $text-right;
      box-sizing: border-box;
      // margin-top: $user-margin * 2;
      // margin-bottom: 0;
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
