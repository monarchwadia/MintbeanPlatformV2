<template lang="pug">
main.container.m-auto
  h1.text-2xl Admin Panel
  section
    div
      h1 Create Event
      FormulateForm(v-model="mbEvent" @submit="onSubmit")
        FormulateInput(type="text" name="title" label="Event Title" validation="required")
        FormulateInput(type="text" name="description" label="Event Description" validation="required")
        FormulateInput(type="textarea" name="description" label="Event Description" validation="required")
        FormulateInput(type="text" name="cover_image_url" label="Image URL" validation="required")
        FormulateInput(type="textarea" name="instructions" label="Instructions" validation="required")
        FormulateInput(type="datetime-local" name="start_time" label="Start Time" validation="required")
        FormulateInput(type="datetime-local" name="end_time" label="End Time" validation="required")
        FormulateInput(type="submit") Submit

    
</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../../components/mb-project-search";

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
