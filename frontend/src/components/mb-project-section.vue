<template lang="pug">
  div.mb-project-section.w-full
    h2.text-3xl.py-5.font-semibold {{ title }}
    input.mx-2.px-2(
      v-if="isAdmin"
      type="text"
      name="title"
      value=""
    )
    button.inline(
      v-on:click="openModal"
    ) Edit
    button.inline(
      @click='deleteSection($event)'
    ) Delete
    mb-modal(
      v-show="isModalVisible"
      @close="closeModal"
    )
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
  name: "mb-project-section",
  props: {
    title: String,
    projects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    deleteSection(e) { console.log(e.target) },
    openModal() {
      this.isModalVisible = true
      console.log('click modal open')
    },
    closeModal() {
      this.isModalVisible = false
    }
  },
  data() {
    return {
      isModalVisible: false
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
}
</script>
