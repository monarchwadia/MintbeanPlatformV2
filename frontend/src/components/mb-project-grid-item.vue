<template lang="pug">
div.mb-project-grid-item
  div.inner
    div.screenshot
      div.overlay
        div.project-title 
          | {{ project.title }}
        div.project-buttons
          mb-a(:href="projectPlatformUrl")
            button Comments
          mb-a(:href="projectDeployedUrl")
            button Visit
          //- button Score
      mb-image-display(:publicId="cloudinaryPublicId" height="300" width="400")
    div.user
      div.username {{ username }}
      div.projectinfo 
        fa.icon(icon="comment")
        | &nbsp; {{ voteCount }}
        fa.icon(icon="star")
        | &nbsp; {{ voteAverage }}
</template>

<style lang="scss" scoped>
@import "../styles/colors";
@import "../styles/mixins";

$width: 400px;
$screenshot-height: 300px;
$gap: 5px;
$user-height: 25px;
$height: $screenshot-height + $gap + $user-height;
$border-radius: 6px;
$background-color: transparent;

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
      border-radius: $border-radius;
      border: 1px solid $color-bg-secondary;
      @include has-box-shadow;
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
        background: linear-gradient(
          180deg,
          rgba(237, 2, 2, 0) 0%,
          rgba(0, 0, 0, 0.8) 100%
        );
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        & * {
          display: inline-block;
        }

        .project-title {
          font-weight: bold;
          color: white;
          text-overflow: ellipsis;
          padding-left: 10px;
        }

        .project-buttons {
          padding-right: 10px;
          display: flex;
          justify-content: end;
          & button {
            margin: 5px;
            padding: 5px 10px;
          }
        }
      }
    }

    .user {
      position: absolute;
      bottom: 0;
      left: 0px;
      width: $width;
      margin: auto;
      font-size: 16px;
      font-weight: bolder;
      height: $user-height;
      line-height: $user-height;
      text-overflow: ellipsis;
      border-radius: $border-radius;
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

      .icon {
        color: $least-red;
      }
    }
  }
}
</style>

<script>
export default {
  name: "mb-project-grid-item",
  props: ["project"],
  computed: {
    username() {
      return this.project.user_fullname;
    },
    voteCount() {
      return this.project.ratingCount ? this.project.ratingCount : "-";
    },
    voteAverage() {
      return this.project.ratingAverage
        ? this.project.ratingAverage.toPrecision(2)
        : "-";
    },
    projectDeployedUrl() {
      return this.project.live_url;
    },
    projectPlatformUrl() {
      return "/project/" + this.project.id;
    },
    cloudinaryPublicId() {
      const { cloudinaryPublicId, mbevent_cover_image_url } = this.project;
      return cloudinaryPublicId || mbevent_cover_image_url;
    }
  },
  methods: {
    expandProject() {
      const { project } = this;
      if (!project) return;
      this.$router.push("/project/" + project.id);
    }
  }
};
</script>
