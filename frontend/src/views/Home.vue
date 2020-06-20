<template lang="pug">
div
  mb-home-header

  main.container.m-auto.py-10
    div.mb-5(v-for="section in sections")
      h2.text-3xl.py-5.font-semibold {{ section.title }}
      div.flex.justify-between
        div.rounded.overflow-hidden.shadow-xl(v-for="project in section.projects" style="width: 400px;")
          div(class="w-full" style="height: 300px; width: 400px;" :style="{ backgroundImage: cloudinaryUrlFor(project.cloudinaryPublicId) }")
          div.px-6.py-4.text-gray-700.flex.flex-col.justify-between
            div.text-xl {{ project.title }}
            div.text-md.mb-2 by {{ project.authorName }}
            div.text-gray-700.text-base.my-5(style="min-height: 60px; max-height: 60px; height: 60px;") {{ project.description }}
            div.flex.justify-left
                div.inline-block.bg-gray-200.rounded-full.px-3.py-1.text-sm.font-semibold.text-gray-700.mr-2(v-for="tag in project.tags") {{`#${tag}`}}
              

    
    //- mb-project-search(show-search-panel=false)

    //- h2 Past events.
    //- section.u-centered
    //-   aside(v-for="mbEvent in mbEvents" class="hackathon-card" v-on:click.prevent="() => goToEvent(mbEvent.id)")
    //-     img(:src="mbEvent.cover_image_url" max-height=300 width="100%")
    //-     h3 {{mbEvent.title}}
    //-     //- b(v-if="getEventStatus(mbEvent) === 'upcoming'")
    //-     //-   countdown(:time="getCountdownTime(mbEvent.start_time)")
    //-     //-     template(slot-scope="props") Starts In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
    //-     //- b(v-if="getEventStatus(mbEvent) === 'ongoing'")
    //-     //-   countdown(:time="getCountdownTime(mbEvent.end_time)")
    //-     //-     template(slot-scope="props") Ends In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
    //-     //- b(v-if="getEventStatus(mbEvent) === 'ended'")
    //-     //-   | Event Ended
    //-     p {{mbEvent.description}}
</template>

<script>
import mbHomeHeader from "./Home/mb-home-header.vue";

export default {
  name: "Home",
  data() {
    return {
      sections: [
        {
          title: 'ReactJS Projects',
          projects: [
            {
              cloudinaryPublicId: "wzk5axcfxliedyrblkdj",
              title: "Piano, with PaperJS",
              projectId: "",
              authorName: "Yasaman Loghmani",
              description:
                "Experience a beautiful fusion of visual design, animation, and audio APIs.",
              tags: ["audio", "animation", "creative"]
            },
            {
              cloudinaryPublicId: "gsrtag5dpz0bm0cz74ma",
              title: "Pokémon Search, with Algolia",
              projectId: "",
              authorName: "Jimmy Peng",
              description:
                "See the power of Algolia in creating a slick, complex, performant Pokémon search application",
              tags: ["search", "algolia", "api"]
            },
            {
              cloudinaryPublicId: "wq35wfvcqgvz3oqwvjcr",
              title: "Chicago bike safety heatmap",
              authorName: "Michael Hammer",
              projectId: "",
              description:
                "Creating powerful, insightful explorations of publicly available datasets using Mapbox.",
              tags: ["map", "geolocation", "heatmap"]
            }
          ]
        },
        {
          title: 'API Integration Projects',
          projects: [
            {
              cloudinaryPublicId: "mqnsisr2zuloikgd3gab",
              title: "Currency Converter",
              authorName: "Ken Charette",
              projectId: "2d729764-6df0-4ea6-8127-9758a3952a10",
              description:
                "Multi-currency converter using React and other tools.",
              tags: ["api", "react", "tool"]
            },
            {
              cloudinaryPublicId: "xolpm0m5zzdmkyggpw5s",
              projectId: "ad76f135-71b6-4d38-90dc-515a1c1aafee",
              title: "3D Map Directions",
              authorName: "Alex Costan",
              description:
                "A 3D map built on top of a Mapbox integration creates a compelling direction search experience",
              tags: ["api", "mapbox", "tool"]
            },
            {
              cloudinaryPublicId: "ynze2sdbr7lciikch91o",
              title: "Ted Talk Search",
              authorName: "Vivian Wang",
              description:
                "Creating powerful explorations of publicly available datasets using Mapbox.",
              projectId: "28abad7a-db21-4bba-bd15-627809cf4a8d",
              tags: ["api", "tool", "search"]
            }
          ]
        },
        {
          title: 'Creative Projects',
          projects: [
            {
              cloudinaryPublicId: "wzk5axcfxliedyrblkdj",
              title: "Piano, with PaperJS",
              authorName: "Yasaman Loghmani",
              description: "Experience a beautiful fusion of visual design, animation, and audio APIs.",
              projectId: "",
              tags: ["audio", "animation", "creative"]
            },
            {
              cloudinaryPublicId: "pdklvyh1arhoiha0uj3d",
              projectId: "9d7ea3a8-5c53-4a28-a950-99fb6c7f2f6d",
              title: "Portals",
              authorName: "Zoë Siskos",
              description:
                "Portals take you to a different place. On the landing page, you get a sneak peek of what is beyond.",
              tags: ["animation", "vanilla", "compilation"]
            },
            {
              cloudinaryPublicId: "vjyzrvsg0hrvqzfwtdf6",
              projectId: "451aca63-0e08-4bc3-a4ad-ac91f3daa317",
              title: "Color Palette Generator",
              authorName: "Matt Taylor",
              description:
                "Useful design tool that generates colors palettes, including complementary, triad, tetrad, and more.",
              tags: ["map", "tool", "design"]
            }
          ]
        }
      ],
      showSearchProjectsModal: false
    };
  },
  computed: {
    mbEvents: function() {
      return this.$store.state.mbEvents || [];
    },
    nextEvent: function() {
      return this.$store.state.mbEvents.find(
        mbEvent => this.getEventStatus(mbEvent) === "upcoming"
      );
    }
  },
  methods: {
    cloudinaryUrlFor: function(id) {
      return `url(https://res.cloudinary.com/mintbean/image/upload/b_black,c_crop,h_600,w_600/${id})`;
    },
    openSearchProjectsModal() {
      this.showSearchProjectsModal = true;
    },
    closeSearchProjectsModal() {
      this.showSearchProjectsModal = false;
    },
    getEventStatus(mbEvent) {
      const timeToStart = new Date(mbEvent.start_time) - new Date();
      const timeToEnd = new Date(mbEvent.end_time) - new Date();

      if (timeToStart > 0) {
        return "upcoming";
      } else {
        if (timeToEnd > 0) {
          return "ongoing";
        } else {
          return "ended";
        }
      }
    },
    getCountdownTime: function(mbEventStartTime) {
      return new Date(mbEventStartTime) - new Date();
    },
    goToEvent: function(id) {
      if (id) {
        this.$router.push("/mb-event/" + id);
      }
    }
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
