<template lang="pug">
  div(style="width: 100%; background-color:red;")
    h2.text-3xl.py-5.font-semibold {{ title }}
    input.mx-2.px-2(
      v-if="isAdmin"
      type="text"
      name="title"
      value=""
      )
    button.inline(
      v-if="isAdmin"
      onclick='alert("can\'t edit yet!")'
    ) Edit
    button.inline(
      v-if="isAdmin"
      @click='deleteSection($event)'
    ) Delete
    div.flex.justify-between
      mb-project-card(
        v-for="project in projects"
        :key="project.projectId"
        :id="project.projectId"
        :cloudinaryPublicId="project.cloudinaryPublicId"
        :title="project.title"
        :authorName="project.authorName"
        :description="project.description"
        :tags="project.tags"
      )
</template>

<script>
export default {
  props: {
    title: String,
    projects: {
      type: Array,
      default: () => []
    }
  },
  name: "mb-project-section",
  methods: {
    deleteSection: (e) => console.log(e.target)
    // cloudinaryUrlFor: function(id) {
    //   return `url(https://res.cloudinary.com/mintbean/image/upload/b_black,c_crop,h_225,w_400/${id})`;
    // }
  },
  data() {
    return {
      // check out sync
      // v-on
      // v-bind
      // sync
      // emit / 2-way binding
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
}
</script>
