<template lang="pug">
  div.mb-project-section.w-full
    h2.text-3xl.py-5.font-semibold {{ title }}
    mb-modal-button(text="Edit")
      template(v-slot:title) Edit section title
      template(v-slot:body)
        FormulateForm.flex.flex-col.py-2
          FormulateInput(type="text" name="title" v-model="editTitle")
          FormulateInput(type="submit" @click.prevent="updateTitle") Submit
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
    button.inline(
      @click='deleteSection($event)'
      ) Delete
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
      editTitle: this.title,
    }
  },
  methods: {
    deleteSection(e) { console.log(e.target) },
    openModal() {
      console.log('click modal open');
      this.$refs.modalEdit.open();
    },
    updateTitle() {
      alert(`pretending to update title to: ${this.editTitle}`)
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
}
</script>
