<template lang="pug">
  div.w-full
    div.mb-2
      h2.text-3xl.py-5.font-semibold.inline {{ title }}
      mb-modal-button.ml-2(v-if="isAdmin" text="Edit" ref="modalEdit")
        template(v-slot:title) Edit section title
        template(v-slot:body)
          FormulateForm
            FormulateInput(type="text" name="title" v-model="editTitle")
            FormulateInput(type="submit" @click.prevent="updateTitle") Submit
      mb-confirm.ml-1(
        v-if="isAdmin"
        @confirm="deleteSection"
        text="Delete"
        title="Confirm"
        message="Are you sure you want to delete this section?"
      )
    div.flex.justify-between
      mb-project-card(
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :cloudinaryPublicId="project.MediaAssets[0].cloudinaryPublicId"
        :projectTitle="project.title"
        :authorName="getFullname(project.User)"
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
      default: () => [],
    }
  },
  data() {
    return {
      editTitle: this.title,
    }
  },
  methods: {
    deleteSection() {
      alert('faking deletion of this section');
    },
    openModal() {
      this.$refs.modalEdit.open();
    },
    updateTitle() {
      alert(`pretending to update title to: ${this.editTitle}`);
      this.$refs.modalEdit.$refs.modal.close();
    },
    getFullname(user) {
      return `${user.firstname} ${user.lastname}`
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    },
  },
}
</script>
