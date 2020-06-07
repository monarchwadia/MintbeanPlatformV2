<template lang="pug">
div.mb-project-grid-item
  div.inner(v-on:click.prevent="() => visitProject(project)")
    div.screenshot
      div.overlay
        div.project-title {{ project.title }}
      mb-image-display(:publicId="cloudinaryPublicIdFor(project)" height="300" width="400")
    div.user
      div.username {{ username }}
      div.projectinfo 
        fa(icon="comment")
        | &nbsp; {{ voteCount }}
</template>

<style lang="scss" scoped>

// $width: 400px;
// $user-margin: 10px;
// $user-height: 75px - $user-margin;
// $screenshot-height: 300px - $user-margin;
// $height: $screenshot-height + $user-height;
// $border-radius: 15px;
// $background-color: white;


$width: 400px;
$screenshot-height: 300px;
$gap: 5px;
$user-height: 25px;
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
      // box-shadow: 6px 12px 25px var(--color-border);
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
          left: 25px;
          right: 25px;
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
      font-size: 12px;
      font-weight: bolder;
      height: $user-height;
      line-height: $user-height;
      text-overflow: ellipsis;
      border-radius: $border-radius;
      // box-shadow: 6px 12px 25px var(--color-border);
      z-index: 1001;
      background-color: $background-color;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      // margin-top: $user-margin * 2;
      // margin-bottom: 0;

      .username {
        float: left;
      }
      .projectinfo {
        float: right;
      }
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
    },
    voteCount() {
      return this.project.Votes.length;
    }
  },
  methods: {
    cloudinaryPublicIdFor(project) {
      return project && project.MediaAssets && project.MediaAssets[0] && project.MediaAssets[0].cloudinaryPublicId;
    },
    visitProject(project) {
      this.$router.push('/project/' + project.id);
    }
  },
};
</script>
