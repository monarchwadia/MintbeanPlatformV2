<template lang="pug">
div
  mb-home-header
  main.container.m-auto.pt-24
    div.mb-32.flex.flex-col
      h1.text-center.md_text-left.text-4xl.mb-4 Upcoming Events
      p.text-2xl.mb-6(v-if="upcomingEvents.length == 0") No events at the moment... Stay tuned!
      mb-event-section.mx-2.md_mx-0.mb-12(v-else :events="upcomingEvents")
      mb-internal-link-arrow.m-auto.md_m-0(
        to="/mb-events"
        text="See all past and future events"
      )
    div.mb-32(v-for="(section, i) in sections")
      mb-project-section(
        :title="section.title"
        :projects="section.projects"
        :key="i"
      )
    //- TODO: RE-IMPLEMENT ADMIN CONTROLS

    //- div.flex.justify-center
    //-   mb-modal-button.ml-2(
    //-     v-if="isAdmin"
    //-     btnText="Add new section"
    //-     ref="modalAddSection")
    //-     template(v-slot:title) Add new section
    //-     template(v-slot:body)
    //-       FormulateForm(live)
    //-         FormulateInput(
    //-           type="text"
    //-           name="newSectionTitle"
    //-           placeholder="New section title"
    //-           v-model="newSectionTitle"
    //-           validation="between:2,40,length"
    //-           error-behavior="live"
    //-         )
    //-         FormulateInput(
    //-           type="submit"
    //-           @click.prevent="createSection"
    //-         ) Add


</template>

<script>
import mbHomeHeader from "./Home/mb-home-header.vue";

export default {
  name: "Home",
  data() {
    return {
      newSectionTitle: "",
      sections: [],
      upcomingEvents: []
    };
  },
  methods: {
    createSection() {
      // TODO: prevent form submission on invalid inputs
      alert(`faking creation of section '${this.newSectionTitle}'`);
      this.newSectionTitle = "";
      this.$refs.modalAddSection.$refs.modal.close();
    },
    getAscFeaturedSections() {
      const self = this;
      this.$mbContext.mbConfigService
        .getAscFeaturedSections()
        .then(res => (self.sections = res))
        .catch(err => console.log(err));
    },
    getUpcomingEvents(limit = 2) {
      const self = this;
      this.$mbContext.mbEventService
        .getUpcomingMbEvents()
        .then(res => (self.upcomingEvents = res.slice(0, limit)));
    }
  },
  mounted() {
    console.log(this.getAscFeaturedSections());
    this.getUpcomingEvents();
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
  components: {
    "mb-home-header": mbHomeHeader
  }
};
</script>
