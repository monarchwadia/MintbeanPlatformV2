<template lang="pug">
mb-external-link(:href="projectDeployedUrl")
  div.shadow-mb.m-2.mb-10.hover_shadow-2xl.cursor-pointer(style="max-width: 400px; background: #3d3d3d;")
    div.inner
      div.screenshot.relative(:style="{background: urlFor(project.mbevent_cover_image_url), backgroundPosition: 'center', backgroundSize: 'cover', minHeight: !cloudinaryPublicId ? '300px' : 0}")
        div.overlay-top.absolute.text-white.py-3.top-0.z-50.w-full(style="background: linear-gradient(180deg, #3d3d3d, transparent);")

        div.overlay-bottom.absolute.flex.items-center.justify-between.text-white.py-2.bottom-0.text-right.z-50.w-full(style="background: linear-gradient(0deg, #3d3d3d,transparent);")

        mb-image-display.relative(v-if="!!cloudinaryPublicId" :publicId="cloudinaryPublicId" height="300" width="400")
        div(v-else)
          div._hide-on-sm(style="width: 400px")
          div._show-on-sm.hidden

      div.p-4.text-white.flex.flex-col.justify-between(style="min-height:166px")
        div
          div.flex.justify-between.items-start.mb-2
            h3.text-lg.font-semibold {{ project.title }}
            div.flex.justify-end(style="min-width:100px;")
              div.inline.mr-2
                fa.icon.text-mb-mint-500(icon="comment")
                | &nbsp; {{ voteCount }}
              div.inline
                fa.icon.text-mb-mint-500(icon="star")
                | &nbsp; {{ voteAverage }}
        div.flex.items-center.mb-2
          mb-avatar.flex-none.mr-2(size="sm")
          p.flex.flex-wrap {{ username }}
        div.flex.justify-center
          mb-a-button.w-full.text-center(isExternal :href="projectPlatformUrl" ) Comments
          //- mb-a-button(isExternal :href="projectDeployedUrl") Demo
</template>

<style lang="scss" scoped>
// spacers for cards with no cloudinary image
@media only screen and (max-width: 457px) {
  ._hide-on-sm {
    display: none;
  }
  ._show-on-sm {
    display: block;
    width: calc(100vw - 4rem);
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
      const { cloudinaryPublicId } = this.project;
      return cloudinaryPublicId || null;
    }
  },
  methods: {
    expandProject() {
      const { project } = this;
      if (!project) return;
      this.$router.push("/project/" + project.id);
    },
    urlFor: function(url) {
      return `url(${url})`;
    }
  }
};
</script>
