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

<style lang="scss" scoped></style>

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
