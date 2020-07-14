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

      h1.mt-4 Edit Featured Projects Sections
        mb-modal-button.ml-2(
          text="Edit"
          ref="modalEditSections")
          template(v-slot:title)
            p Edit Featured Projects Sections
            p (Drag textarea to englarge)
          template(v-slot:body)
            FormulateForm(live)
              FormulateInput(
                type="textarea"
                name="featuredSectionsJSON"
                placeholder="Enter JSON here"
                v-model="featuredSectionsJSONstr"
                validation="required"
              )
              FormulateInput(
                type="submit"
                @click.prevent="updateFeaturedProjectsSections"
              ) Update
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
      },
      featuredSectionsJSONstr: {},
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
    },
    async updateFeaturedProjectsSections() {
      const confirmed = confirm("Are you sure you want to make this change?");
      if (confirmed) {
        const self = this;
        console.log(this.featuredSectionsJSONstr);
        const value = await this.$mbContext.mbConfigService
          .patchValueByEndpoint('featuredSections', self.featuredSectionsJSONstr);
        console.log({value})
        this.$refs.modalEditSections.$refs.modal.close();
      } else {
        return;
      }
    }
  },
  mounted() {
    const self = this;
    this.$mbContext.mbConfigService
      .getValueByKey('featuredSections')
        .then(res => JSON.stringify(JSON.parse(res), null, '\t'))
        .then(data => self.featuredSectionsJSONstr = data)
  },
};
</script>
