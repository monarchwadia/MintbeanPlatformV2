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
          btnText="Edit"
          ref="modalEditSections")
          template(v-slot:title)
            p Edit Featured Projects Sections
            p (Drag textarea to englarge)
          template(v-slot:body)
            FormulateForm.text-xs(live)
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

        mb-modal-button.ml-2(btnText="Show me an example" btnVariant="default")
          template(v-slot:title) Example format for featured projects sections
          template(v-slot:body)
            textarea.text-xs.w-full(rows="25" :value="featuredSectionsJSONstrSample")

</template>

<style lang="scss" scoped></style>

<script>
import mbProjectSearch from "../../components/mb-project-search";

const sampleFeaturedSectionsFormat = {
	"sections": [
		{
			"title": "ReactJS Projects",
			"projectIds": [
				"e17daffa-55f8-47c6-a5eb-6c44772997b0",
				"8e4f2f69-d062-4bb9-95b2-7b13e63cded7",
				"cebf06ed-3a84-4fc1-b39d-067cf2ac3f83",
				"af9a1cfc-4dc5-4cf4-8e9a-9bce1ecb874b",
				"9b682f85-9763-4df5-89ed-da475e515907",
				"d4bfa64a-ea37-4b1e-ba77-5cd689a304ed",
				"473970f7-e86b-49cc-a346-fb7603c1a1f2",
				"58021746-8a9c-4a77-b6f5-c54aeaf1a1be",
				"32cc3751-e317-4eac-9915-c9f7333db50d",
				"b3ac69bb-4ddc-4440-9074-63a47bbd5a5b"
			]
		},
		{
			"title": "SUPER Projects",
			"projectIds": [
				"e17daffa-55f8-47c6-a5eb-6c44772997b0",
				"8e4f2f69-d062-4bb9-95b2-7b13e63cded7",
				"cebf06ed-3a84-4fc1-b39d-067cf2ac3f83",
				"af9a1cfc-4dc5-4cf4-8e9a-9bce1ecb874b",
				"9b682f85-9763-4df5-89ed-da475e515907",
				"d4bfa64a-ea37-4b1e-ba77-5cd689a304ed",
				"473970f7-e86b-49cc-a346-fb7603c1a1f2",
				"58021746-8a9c-4a77-b6f5-c54aeaf1a1be",
				"32cc3751-e317-4eac-9915-c9f7333db50d",
				"b3ac69bb-4ddc-4440-9074-63a47bbd5a5b"
			]
		},
		{
			"title": "API Integration Projects",
			"projectIds": [
				"9c8f6caa-7a85-4d9d-a3f3-08911861cdf3",
				"f1a7ea56-23ba-46f2-907d-65974c051f7d",
				"cd918a5b-2675-4322-82ca-693cc979272c",
				"5f0d75b8-5b71-4fbe-9db4-09fff7e1cffe",
				"187c582a-db25-49fc-9bb7-e8f1a74adcd3",
				"8339a5cd-9678-48c0-bdd6-2d2a63afcf52",
				"e5e87750-6717-4dce-a7a1-1108cde0ef23",
				"e9d0bdd4-be71-4863-9161-c7dfe2dfbafc",
				"c6103fba-48c3-479c-8bda-d871f48ae5dc",
				"89e4faaf-36cf-422e-8cbb-3aada6eb7cbc"
			]
		},
		{
			"title": "Creative Projects",
			"projectIds": [
				"781d0bcf-810f-4c17-97b0-93124b6f328b",
				"77ca3453-f17d-4328-bb3b-52a30cf6271b",
				"c6103fba-48c3-479c-8bda-d871f48ae5dc",
				"bafc5329-e79f-455a-a446-099c8fb9d729",
				"46f3bd8e-6290-4b10-bd28-e1ec2cea05e5",
				"04142f1b-92eb-40ab-a2ea-2c3699409b38",
				"373355de-d74e-4fb7-a1a6-c69826062529",
				"98e56285-7fef-4d6e-b30a-2627db1f73ce",
				"672c160f-dcea-43e0-98fe-bc04f2e09b58",
				"a86c2a12-0bdc-4f92-a04f-e1d9165bb310"
			]
		}
	]
}
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
      featuredSectionsJSONstrSample: JSON.stringify(sampleFeaturedSectionsFormat, null, '\t')
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
        const value = await this.$mbContext.mbConfigService
          .patchValueByEndpoint('featuredSections', self.featuredSectionsJSONstr);
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
