<template lang="pug">
main.container.m-auto
  h1.text-5xl Admin Panel

  h1.text-2xl.mt-12 Edit Featured Projects Sections
  mb-modal-button.ml-2(btnText="Show me an example" btnVariant="default")
    template(v-slot:title) Example format for featured projects sections
    template(v-slot:body)
      textarea.text-xs.w-full(rows="25" :value="featuredSectionsJSONstrSample")
  mb-modal-button.ml-2(
    btnText="Edit"
    ref="modalEditSections")
    template(v-slot:title)
      p Edit Featured Projects Sections
      p (Drag textarea to englarge)
    template(v-slot:body)
      FormulateForm.text-xs(live)
        FormulateInput(
          type="textarea"
          name="featuredSectionsJSONstr"
          placeholder="Enter JSON here"
          v-model="featuredSectionsJSONstr"
          validation="required"
        )
        FormulateInput(
          type="submit"
          @click.prevent="updateFeaturedProjectsSections"
        ) Update

  h1.text-2xl.mt-12 Create Event
  FormulateForm(v-model="mbEvent" @submit="onSubmit")
    FormulateInput(type="text" name="title" label="Event Title" validation="required")
    FormulateInput(type="textarea" name="description" label="Event Description" validation="required")
    FormulateInput(type="text" name="cover_image_url" label="Image URL" validation="required")
    FormulateInput(type="textarea" name="instructions" label="Instructions" validation="required")
    FormulateInput(type="text" name="register_link" label="Registration link" validation="required")
    FormulateInput(type="datetime-local" name="start_time" label="Start Time" validation="required")
    FormulateInput(type="datetime-local" name="end_time" label="End Time" validation="required")
    FormulateInput(type="submit") Submit


</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../../components/mb-project-search";
//- import dateService from "../../helpers/dateService";

const sampleFeaturedSectionsFormat = {
  sections: [
    {
      title: "ReactJS Projects",
      projectIds: [
        "e17daffa-55f8-47c6-a5eb-6c44772997b0",
        "8e4f2f69-d062-4bb9-95b2-7b13e63cded7",
        "32cc3751-e317-4eac-9915-c9f7333db50d",
        "b3ac69bb-4ddc-4440-9074-63a47bbd5a5b"
      ]
    },
    {
      title: "API Integration Projects",
      projectIds: [
        "9c8f6caa-7a85-4d9d-a3f3-08911861cdf3",
        "f1a7ea56-23ba-46f2-907d-65974c051f7d",
        "cd918a5b-2675-4322-82ca-693cc979272c",
        "5f0d75b8-5b71-4fbe-9db4-09fff7e1cffe"
      ]
    },
    {
      title: "Creative Projects",
      projectIds: [
        "781d0bcf-810f-4c17-97b0-93124b6f328b",
        "77ca3453-f17d-4328-bb3b-52a30cf6271b",
        "c6103fba-48c3-479c-8bda-d871f48ae5dc",
        "bafc5329-e79f-455a-a446-099c8fb9d729",
        "a86c2a12-0bdc-4f92-a04f-e1d9165bb310"
      ]
    }
  ]
};
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
        end_time: new Date(),
        register_link: ""
      },
      featuredSectionsJSONstr: "",
      featuredSectionsJSONstrSample: JSON.stringify(
        sampleFeaturedSectionsFormat,
        null,
        "\t"
      )
    };
  },
  components: {
    "mb-project-search": mbProjectSearch
  },
  computed: {},
  methods: {
    onSubmit() {
      //- dateService.dbDateToTimezone(this.mbEvent.start_time, )
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
            (e && e.response && e.response.data && e.response.data.message) ||
            "";
          console.log("Failed to create event", message, e);
          alert("Failed to create event. " + message);
        });
    },
    async updateFeaturedProjectsSections() {
      const confirmed = confirm("Are you sure you want to make this change?");
      if (confirmed) {
        const self = this;
        await this.$mbContext.mbConfigService
          .patchValueByEndpoint(
            "featuredSections",
            JSON.parse(self.featuredSectionsJSONstr)
          )
          .then(() => alert("Updated featured projects sections!"))
          .then(() => this.$refs.modalEditSections.$refs.modal.close())
          .catch(() => alert("Failed to update. Check object formatting"));
      } else {
        return;
      }
    }
  },
  mounted() {
    const self = this;
    this.$mbContext.mbConfigService
      .getValueByKey("featuredSections")
      .then(res => JSON.stringify(res, null, "\t"))
      .then(data => (self.featuredSectionsJSONstr = data));
  }
};
</script>
