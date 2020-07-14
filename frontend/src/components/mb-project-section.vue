<template lang="pug">
  div.sliding-section.w-full.overflow-x-auto(:class="sliderIsDown ? 'active' : null" ref="projectSectionContainer")
    div.mb-2
      h2.text-3xl.py-5.font-semibold.inline {{ title }}
      mb-modal-button.ml-2(v-if="isAdmin" btnText="Edit" ref="modalEdit")
        template(v-slot:title) Edit section title
        template(v-slot:body)
          FormulateForm
            FormulateInput(type="text" name="title" v-model="editTitle")
            FormulateInput(type="submit" @click.prevent="updateTitle") Submit
      mb-confirm.ml-1(
        v-if="isAdmin"
        @confirm="deleteSection"
        btnText="Delete"
        title="Confirm"
        message="Are you sure you want to delete this section?"
      )
    div.flex.justify-between
      mb-project-card.mr-2(
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :cloudinaryPublicId="project.MediaAssets[0].cloudinaryPublicId"
        :projectTitle="project.title"
        :authorName="getFullname(project.User)"
        :description="project.description"
        :tags="project.tags"
        :disableClick="sliderIsDown"
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
      sliderIsDown: false,
      startX: null,
      scrollLeft: null,
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
    },
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    },
  },
  mounted() {
    // listen for horizontal scroll drag (https://codepen.io/thenutz/pen/VwYeYEE)
    this.$refs.projectSectionContainer.addEventListener('mousedown', (e) => {
      this.sliderIsDown = true;
      this.startX = e.pageX - this.$refs.projectSectionContainer.offsetLeft;
      this.scrollLeft = this.$refs.projectSectionContainer.scrollLeft;
    });
    this.$refs.projectSectionContainer.addEventListener('mouseleave', () => {
      this.sliderIsDown = false;
    });
    this.$refs.projectSectionContainer.addEventListener('mouseup', () => {
      this.sliderIsDown = false;
    });
    this.$refs.projectSectionContainer.addEventListener('mousemove', (e) => {
      if(!this.sliderIsDown) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.projectSectionContainer.offsetLeft;
      const walk = (x - this.startX) * 3; //scroll-fast
      this.$refs.projectSectionContainer.scrollLeft = this.scrollLeft - walk;
    });
  }
}
</script>

<style lang="css" scoped >
  .sliding-section.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    transform: scale(1.01);
    transition: ease 0.2s;
  }
  .sliding-section {
    transition: ease 0.2s;
  }

</style>
