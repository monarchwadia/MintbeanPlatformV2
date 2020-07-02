<template lang="pug">
div
  mb-home-header
  main.container.m-auto.pt-32
    div.pb-32(v-for="section in sections")
      mb-project-section(
        :title="section.title"
        :projects="section.projects"
        )

</template>

<script>
import mbHomeHeader from "./Home/mb-home-header.vue";

export default {
  name: "Home",
  data() {
    return {
      sections: [
        {
          title: "ReactJS Projects",
          projects: [
            {
              cloudinaryPublicId: "wzk5axcfxliedyrblkdj",
              title: "Piano, with PaperJS",
              authorName: "Yasaman Loghmani",
              description:
                "Experience a beautiful fusion of visual design, animation, and audio APIs.",
              projectId: "736c384b-e5ab-4536-b8e5-40c03d659338",
            },
            {
              cloudinaryPublicId: "gsrtag5dpz0bm0cz74ma",
              title: "Pokémon Search, with Algolia",
              projectId: "8ad96864-1187-4b11-8d70-57dcbac0b766",
              authorName: "Jimmy Peng",
              description:
                "See the power of Algolia in creating a slick, complex, performant Pokémon search application",
            },
            {
              cloudinaryPublicId: "wq35wfvcqgvz3oqwvjcr",
              title: "Chicago bike safety heatmap",
              authorName: "Michael Hammer",
              projectId: "b6a3d928-e890-4fb8-b8e3-729c1a011126",
              description:
                "Creating powerful, insightful explorations of publicly available datasets using Mapbox.",
            }
          ]
        },
        {
          title: "API Integration Projects",
          projects: [
            {
              cloudinaryPublicId: "mqnsisr2zuloikgd3gab",
              title: "Currency Converter",
              authorName: "Ken Charette",
              projectId: "2d729764-6df0-4ea6-8127-9758a3952a10",
              description:
                "Multi-currency converter using React and other tools.",
            },
            {
              cloudinaryPublicId: "xolpm0m5zzdmkyggpw5s",
              projectId: "ad76f135-71b6-4d38-90dc-515a1c1aafee",
              title: "3D Map Directions",
              authorName: "Alex Costan",
              description:
                "A 3D map built on top of a Mapbox integration creates a compelling direction search experience",
            },
            {
              cloudinaryPublicId: "ynze2sdbr7lciikch91o",
              title: "Ted Talk Search",
              authorName: "Vivian Wang",
              description:
                "Creating powerful explorations of publicly available datasets using Mapbox.",
              projectId: "28abad7a-db21-4bba-bd15-627809cf4a8d",
            }
          ]
        },
        {
          title: "Creative Projects",
          projects: [
            {
              cloudinaryPublicId: "wzk5axcfxliedyrblkdj",
              title: "Piano, with PaperJS",
              authorName: "Yasaman Loghmani",
              description:
                "Experience a beautiful fusion of visual design, animation, and audio APIs.",
              projectId: "736c384b-e5ab-4536-b8e5-40c03d659338",
            },
            {
              cloudinaryPublicId: "pdklvyh1arhoiha0uj3d",
              projectId: "9d7ea3a8-5c53-4a28-a950-99fb6c7f2f6d",
              title: "Portals",
              authorName: "Zoë Siskos",
              description:
                "Portals take you to a different place. On the landing page, you get a sneak peek of what is beyond.",
            },
            {
              cloudinaryPublicId: "vjyzrvsg0hrvqzfwtdf6",
              projectId: "451aca63-0e08-4bc3-a4ad-ac91f3daa317",
              title: "Color Palette Generator",
              authorName: "Matt Taylor",
              description:
                "Useful design tool that generates colors palettes, including complementary, triad, tetrad, and more.",
            }
          ]
        }
      ],
      showSearchProjectsModal: false
    };
  },
  mounted() {
    const self = this;
    this.$mbContext.projectService
      .search()
      .then(results => {
        self.projects = results;
      })
      .catch(e => {
        console.error("Failed to fetch frontpage projects", e);
      });
  },
  components: {
    "mb-home-header": mbHomeHeader
  }
};
</script>
