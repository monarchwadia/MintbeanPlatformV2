<template lang="pug">
  div.mb-project-section.w-full
    h2.text-3xl.py-5.font-semibold {{ title }}
    button.inline(
      v-on:click="openModal"
      v-if="isAdmin"
    ) Edit
    button.inline(
      @click='deleteSection($event)'
    ) Delete
    mb-modal(
      ref="modalEdit"
    )
      template(v-slot:title) Edit section
      template(v-slot:body)
        div.p-2
          input(
            type="text"
            placeholder="Section title"
            class="p-2"
            v-model="title"
          )
    div.flex.justify-between
      mb-project-card(
        v-for="project in projects"
        :key="project.projectId"
        :id="project.projectId"
        :cloudinaryPublicId="project.cloudinaryPublicId"
        :projectTitle="project.title"
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
  data() {
    return {
    }
  },
  methods: {
    deleteSection(e) { console.log(e.target) },
    openModal() {
      console.log('click modal open');
      this.$refs.modalEdit.open();
    },
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
}
</script>
