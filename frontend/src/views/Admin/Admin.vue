<template lang="pug">
main.container.m-auto.max-w-screen-md
  h1.text-5xl Admin Panel
  h1.text-2xl.mt-12 Edit Featured Projects Sections
  mb-modal-button(btnText="Show me an example" btnVariant="default")
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
    FormulateInput(type="select" name="region" :options="options" label="Region of event" validation="required")
    FormulateInput(type="datetime-local" name="start_time" label="Start Time" validation="required")
    FormulateInput(type="datetime-local" name="end_time" label="End Time" validation="required")
    FormulateInput(type="submit") Submit


</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../../components/mb-project-search";
import dates from "../../helpers/dates";

const sampleFeaturedSectionsFormat = {
  id: "826cbfea-0665-4357-b100-8dad8b3e2adb",
  configKey: "featuredSections",
  configValue: {
    sections: [
      {
        title: "API Integration Projects",
        projectIds: [
          "e139501b-a04d-43cc-b9a6-b2e3a4dca6ab",
          "72cb0282-7bb4-47fd-a691-8d426e66c446",
          "d1a36697-24f0-46c6-9d98-34f4ba229958",
          "bab9f7b7-bca4-4bc3-bb4f-00305dc7a9c9"
        ]
      },
      {
        title: "Creative Projects",
        projectIds: [
          "9e8402e6-87d5-4af0-9f8f-136cc10b738a",
          "fb84432f-1dd1-4b4a-9158-8371eed42bbd",
          "13a558c3-8d24-4b1b-a146-b67608f256f0",
          "e8c570f2-a7c4-429b-9531-497a7bb17188"
        ]
      }
    ]
  },
  createdAt: "2020-08-08T00:05:57.788Z",
  updatedAt: "2020-08-08T22:57:38.130Z"
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
        start_time: this.defaultTime(12),
        end_time: this.defaultTime(16),
        register_link: "",
        region: "America/Toronto"
      },
      options: {
        "America/Toronto": "America/Toronto"
      },
      featuredSectionsJSONstr: "",
      featuredSectionsJSONstrSample: JSON.stringify(
        sampleFeaturedSectionsFormat,
        null,
        5
      )
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

      console.log(this.mbEvent);
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
        const newVal = JSON.parse(
          self.featuredSectionsJSONstr.replace(/\t/g, "")
        );

        await this.$mbContext.mbConfigService
          .patchValueByKey("featuredSections", newVal)
          .then(() => alert("Updated featured projects sections!"))
          .then(() => this.$refs.modalEditSections.closeModal())
          .catch(() => alert("Failed to update. Check object formatting"));
      } else {
        return;
      }
    },
    defaultTime(hr = 12, min = 0) {
      const now = new Date();
      return dates.buildTimestampStr({
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        hour: hr,
        min: min
      });
    }
  },
  mounted() {
    const self = this;
    this.$mbContext.mbConfigService
      .getValueByKey("featuredSections")
      .then(res => {
        return JSON.stringify(res, null, 5);
      })
      .then(data => (self.featuredSectionsJSONstr = data));
  }
};
</script>
