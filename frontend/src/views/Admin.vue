<template lang="pug">
main.container.m-auto
  h1.text-2xl Admin Panel
  section
    form.login-form(v-on:submit.prevent="onSubmit")
      h1 Create Event
      label Event Title
        input(name="title", v-model="mbEvent.title")
      label Event Description
        textarea.h-12.min-w-full(name="description" v-model="mbEvent.description")
      label Image URL
        input(name="cover_image_url", v-model="mbEvent.cover_image_url")
      label Instructions
        textarea(name="instructions", v-model="mbEvent.instructions")
      label Start Time
        input(name="start_time", type="datetime-local", v-model="mbEvent.start_time")
      label End Time
        input(name="end_time", type="datetime-local", v-model="mbEvent.end_time")
      button(type="submit") Submit

    
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
