<template lang="pug">
main.container.m-auto
  h1.text-2xl Admin Panel
  section
    form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(v-on:submit.prevent="onSubmit")
      h1 Create Event
      mb-label Event Title
        mb-input(name="title", v-model="mbEvent.title")
      mb-label Event Description
        textarea.h-12.min-w-full(name="description" v-model="mbEvent.description")
      mb-label Image URL
        mb-input(name="cover_image_url", v-model="mbEvent.cover_image_url")
      mb-label Instructions
        textarea(name="instructions", v-model="mbEvent.instructions")
      mb-label Start Time
        mb-input(name="start_time", type="datetime-local", v-model="mbEvent.start_time")
      mb-label End Time
        mb-input(name="end_time", type="datetime-local", v-model="mbEvent.end_time")
      mb-button(type="submit") Submit

    
</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../components/mb-project-search";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      mbEvent: {
        title: "",
        description: "",
        cover_image_url: "",
        instructions: "",
        start_time: new Date(),
        end_time: new Date()
      }
    };
  },
  components: {
    "mb-project-search": mbProjectSearch
  },
  computed: {},
  methods: {
    onSubmit() {
      const self = this;
      const { mbEventService } = this.$mbContext;

      mbEventService
        .create(this.mbEvent)
        .then(mbEvent => {
          alert("Success! Navigating to the event.");
          self.$router.push("/mb-event/" + mbEvent.id);
        })
        .catch(e => {
          const message =
            // eslint-disable-next-line prettier/prettier
          (e && e.response && e.response.data && e.response.data.message) || "";
          console.log("Failed to create event", message, e);
          alert("Failed to create event. " + message);
        });
    }
  }
};
</script>
