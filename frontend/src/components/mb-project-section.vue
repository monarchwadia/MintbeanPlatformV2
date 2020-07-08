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
    mb-modal-button(text="Edit")
      template(v-slot:title) Edit section title
      template(v-slot:body)
        form.flex.flex-col.py-2
          input.mb-2(type="text" name="sectionTitle" v-model="title")
          mb-button(type="submit" @click.prevent="updateTitle") Submit
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
    updateTitle() {
      alert('pretending to update title')
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
}
</script>
