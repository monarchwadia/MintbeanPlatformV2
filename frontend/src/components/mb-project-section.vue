<template lang="pug">
  div.w-full
    div.mb-2
      h2.text-3xl.py-5.font-semibold.inline {{ title }}
      //- mb-modal-button.ml-2(v-if="isAdmin" btnText="Edit" ref="modalEdit")
      //-   template(v-slot:title) Edit section title
      //-   template(v-slot:body)
      //-     FormulateForm
      //-       FormulateInput(type="text" name="title" v-model="editTitle")
      //-       FormulateInput(type="submit" @click.prevent="updateTitle") Submit
      //- mb-confirm.ml-1(
      //-   v-if="isAdmin"
      //-   @confirm="deleteSection"
      //-   btnText="Delete"
      //-   title="Confirm"
      //-   message="Are you sure you want to delete this section?"
      //- )
    div.sliding-section.flex.justify-between.overflow-x-auto(ref="projectSectionContainer")
      mb-project-card.mr-4(
        v-if="!!project"
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :cloudinaryPublicId="project.MediaAssets[0].cloudinaryPublicId "
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
      default: () => []
    }
  },
  data() {
    return {
      editTitle: this.title
    };
  },
  methods: {
    deleteSection() {
      alert("faking deletion of this section");
    },
    openModal() {
      this.$refs.modalEdit.open();
    },
    updateTitle() {
      alert(`pretending to update title to: ${this.editTitle}`);
      this.$refs.modalEdit.$refs.modal.close();
    },
    getFullname(user) {
      return `${user.firstname} ${user.lastname}`;
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  }
};
</script>

<style lang="css" scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(2, 237, 157, 0.6);
  background: -moz-linear-gradient(
    90deg,
    rgba(2, 237, 157, 0.6) 0%,
    rgba(0, 155, 226, 0.6) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(2, 237, 157, 0.6) 0%,
    rgba(0, 155, 226, 0.6) 100%
  );
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
