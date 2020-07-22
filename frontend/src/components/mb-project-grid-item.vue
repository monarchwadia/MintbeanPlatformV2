<template lang="pug">
div.shadow-mb.m-2.mb-10.hover_shadow-2xl.cursor-pointer(style="width: 400px; background: #3d3d3d;")
  div.inner
    div.screenshot.relative
      div.overlay-top.absolute.text-white.p-3.pb-3.top-0.z-50.w-full(style="background: linear-gradient(180deg, #3d3d3d, transparent);")
        h3.text-xl.font-semibold {{ project.title }}
      div.overlay-bottom.absolute.flex.items-center.justify-between.text-white.py-2.px-3.pt-3.bottom-0.text-right.z-50.w-full(style="background: linear-gradient(0deg, #3d3d3d,transparent);")
        div.flex.items-center
          //- mb-avatar.mr-2(size="sm")
          //- p {{ username }}


      mb-image-display.relative(:publicId="cloudinaryPublicId" height="300" width="400")
    div.p-3.text-white
      div.flex.justify-between.mb-4
        div.flex.items-center.mr-2
          mb-avatar.flex-none.mr-2(size="sm")
          p.flex.flex-wrap {{ username }}
        div(style="min-width:100px;")
          div.inline.mr-2
            fa.icon.text-mb-mint-500(icon="comment")
            | &nbsp; {{ voteCount }}
          div.inline
            fa.icon.text-mb-mint-500(icon="star")
            | &nbsp; {{ voteAverage }}
      div.flex.w-full.justify-end
        mb-a-button.mr-2(isExternal :href="projectPlatformUrl") Comments
        mb-a-button(isExternal :href="projectDeployedUrl") Demo
</template>

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
