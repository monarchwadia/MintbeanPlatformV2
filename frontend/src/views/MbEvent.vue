<template lang="pug">
div
  div(v-if="!mbEvent")
    mb-center-message(header="Loading" body="Please wait...")
  div(v-else)
    div.mb-32.relative.bg-fixed.min-h-screen(class="bg-no-repeat bg-center" :style="{'background-image': `url(${mbEvent.cover_image_url})`, 'background-size': 'cover'}" style="box-shadow: 0 10px 20px -10px rgba(0,0,0,0.3);" ref="cover")
      //- spacer
      div(style="height: 30vh")
      div.rounded.gradient-blue-mint.p-1.m-auto(style="max-width: 40vw;")
        div.bg-white.p-12.rounded.text-center
          h1.text-5xl.font-semibold {{ mbEvent.title }}
          p.text-xl.py-2 {{ prettyDate }}
    div.container.m-auto.mb-32
      div.flex.mb-16
        div.flex-grow.mr-4.shadow-mb.p-10.self-center.flex.flex-col.justify-center(style="flex-basis: 60%;")
          div.mb-6
            h2.text-3xl Description
            p {{ mbEvent.description }}
          div
            h2.mt-2.text-2xl Instructions
            h3 {{ mbEvent.instructions }}

        div.flex-grow.shadow-mb.p-10.flex.flex-col.justify-end(style="flex-basis: 40%;")
          section(v-if="submitFormState.enabled")
            form(v-on:submit.prevent="handleSubmitProject")
              h2.text-3xl.mb-1 Submit a Project
              div.flex.flex-col.mb-form
                label(for="source_code_url") Title
                input(name="title" id="title" placeholder="Title" v-model="title")
                label(for="source_code_url") Source Code URL
                input(name="source_code_url" id="source_code_url" placeholder="Source Code URL" v-model="source_code_url")
                label(for="live_code_url") Deployment URL
                input(name="live_url" id="live_code_url" placeholder="Deployment URL" v-model="live_url")
                div.flex.m-auto
                  label Screenshots & Videos
                    mb-file-upload(:files="myFiles" name="files" ref="mbFileUpload")
                mb-button(type="submit") Submit
          section.h-full.flex(v-else)
            h2.text-xl.text-center.mb-2.self-center {{ submitFormState.disabledMessage }}
          section.w-full(v-if="submitFormState.showLoginButton")
            mb-internal-link.w-full(to="/auth/login")
              mb-button.w-full Login

      h2.text-3xl
      section(v-if="projects && projects.length === 0")
        p No submissions yet. Be the first to submit a project!
      mb-project-grid(v-else :projects="projects")



//- div
//-   div(v-if="mbEvent")
//-     div.relative.bg-fixed.min-h-screen(class="bg-no-repeat bg-center" :style="{'background-image': `url(${mbEvent.cover_image_url})`, 'background-size': 'cover'}" ref="cover")
//-       div.rounded.inline-block.gradient-blue-mint.p-1.absolute(style="top: 30vh; left: 10vw; max-width: 40vw")
//-         div.bg-white.p-12.rounded
//-           h1.text-5xl.font-semibold {{ mbEvent.title }}
//-           p.text-xl.py-2 {{ prettyDate }}
//-     p {{ mbEvent.description }}
//-     h3 Submissions
//-     section(v-if="projects && projects.length === 0")
//-       p No submissions yet. Be the first to submit a project!
//-     mb-project-grid(v-else :projects="projects")
//-     section(v-if="submitFormState.enabled")
//-       form.submit-project-form(v-on:submit.prevent="handleSubmitProject")
//-         h1 Submit a Project
//-         div.flex
//-           label Title
//-             input(name="title", v-model="title")
//-           label Source Code URL
//-             input(name="source_code_url", v-model="source_code_url")
//-           label Deployment URL
//-             input(name="live_url", v-model="live_url")
//-           button(type="submit") Submit
//-         div.flex
//-           label Screenshots & Videos
//-             mb-file-upload(:files="myFiles" name="files" ref="mbFileUpload")
//-
//-     section(v-else)
//-       h1 {{ submitFormState.disabledMessage }}
//-     section(v-if="submitFormState.showLoginButton")
//-       mb-internal-link(to="/auth/login")
//-         button Login
//- //-
//- div.event-wrapper
//-   div.event-wrapper-inner
//-     div.background-banner
//-     main.event
//-       div(v-if="!!mbEvent")
//-         h1 {{ mbEvent.title }}
//-         h3 Description
//-         p {{ mbEvent.description }}
//-         h3 Instructions
//-         p {{ mbEvent.instructions }}
//-         h3 Date & Time
//-         p {{ prettyDate }}
//-         h3 Submissions
//-         section(v-if="projects && projects.length === 0")
//-           p No submissions yet. Be the first to submit a project!
//-         mb-project-grid(v-else :projects="projects")
//-         section(v-if="submitFormState.enabled")
//-           form.submit-project-form(v-on:submit.prevent="handleSubmitProject")
//-             h1 Submit a Project
//-             div.flex
//-               label Title
//-                 input(name="title", v-model="title")
//-               label Source Code URL
//-                 input(name="source_code_url", v-model="source_code_url")
//-               label Deployment URL
//-                 input(name="live_url", v-model="live_url")
//-               button(type="submit") Submit
//-             div.flex
//-               label Screenshots & Videos
//-                 mb-file-upload(:files="myFiles" name="files" ref="mbFileUpload")
//-
//-         section(v-else)
//-           h1 {{ submitFormState.disabledMessage }}
//-         section(v-if="submitFormState.showLoginButton")
//-           mb-internal-link(to="/auth/login")
//-             button Login


</template>

<style lang="scss" scoped></style>

<script>
import moment from "moment";

// @ is an alias to /src
export default {
  name: "Event",
  data() {
    return {
      mbEvent: null,
      projects: [],
      source_code_url: "",
      title: "",
      live_url: "",
      myFiles: []
    };
  },
  computed: {
    // projects: function() {
    //   return this.mbEvent && this.mbEvent.Projects;
    // },
    prettyDate: function() {
      if (!this.mbEvent.start_time) {
        return "";
      }
      return moment(this.mbEvent.start_time).format("dddd, MMMM Do YYYY, ha") + " EST";
    },
    // mbEvent: function() {
    //   const { id } = this.$route.params;
    //   const { state } = this.$store;
    //   const { mbEvents } = state;
    //   const votes = state.votes || [];
    //   console.log("VOTES", votes);

    //   if (!id || !mbEvents) {
    //     return;
    //   }

    //   const mbEvent = this.$store.state.mbEvents.find(x => x.id === id);

    //   return mbEvent;
    // },
    submitFormState: function() {
      const { user } = this.$store.state;

      if (!user) {
        return {
          enabled: false,
          disabledMessage: "You must be logged in to submit a project.",
          showLoginButton: true
        };
      }

      if (this.projects.find(project => project.user_id === user.id)) {
        return {
          enabled: false,
          disabledMessage: "Thank you for submitting your project.",
          showLoginButton: false
        };
      }

      return {
        enabled: true,
        disabledMessage: undefined,
        showLoginButton: false
      };
    }
  },
  methods: {
    fetchMbEvent() {
      const self = this;
      const { id } = this.$route.params;

      this.$mbContext.mbEventService
        .fetchMbEvent(id)
        .then(mbEvent => {
          self.mbEvent = mbEvent
        })
        .catch(e => {
          console.error(e);
          alert("Failed to fetch event");
        });
    },
    fetchProjects() {
      const self = this;
      const { id } = this.$route.params;

      this.$mbContext.projectService
        .search({
          mbEventId: id,
          ratingCountMin: 0
        })
        .then(projects => {
          self.projects = projects;
        })
        .catch(e => {
          console.error(e);
          alert("Failed to fetch event");
        });
    },
    handleSubmitProject() {
      const self = this;
      const { title, source_code_url, live_url } = this;
      const isConfirmed = confirm(`Submitting a project is final. PROJECTS CANNOT CURRENTLY BE EDITED OR DELETED AFTER SUBMISSION!
Your project will have the following information:
====
Title: ${title}
Source Code URL: ${source_code_url}
Deployment URL: ${live_url}
====
Would you like to continue?`);

      if (!isConfirmed) {
        return;
      }

      const MediaAssets = this.$refs.mbFileUpload.getFiles().map(f => ({
        cloudinaryPublicId: f.public_id
      }));

      this.$store
        .dispatch("submitProject", {
          title,
          source_code_url,
          live_url,
          MbEventId: this.mbEvent.id,
          MediaAssets
        })
      .then(() => {
        self.fetchProjects();
      }).catch((e) => {
        alert("Failed to submit project.");
        console.log("Failed to submit project.", e);
      });
    }
  },
  mounted() {
    this.fetchMbEvent();
    this.fetchProjects();
    this.$refs.cover.scrollIntoView();
  }
};
</script>
