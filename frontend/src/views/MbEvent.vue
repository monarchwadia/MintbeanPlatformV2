<template lang="pug">
div
  div(v-if="!mbEvent")
    mb-center-message(header="Loading" body="Please wait...")
  div(v-else)
    div.mb-16.md_mb-32.relative.bg-fixed.min-h-screen.bg-no-repeat.bg-center.bg-contain(:style="{'background-image': `url(${mbEvent.cover_image_url})`, 'background-size': 'cover'}" style="box-shadow: 0 10px 20px -10px rgba(0,0,0,0.3);" ref="cover")
      mb-back-button.absolute.left-0.text-white.p-4(style="background: rgba(0,0,0,0.3);")
      div(style="height: 30vh")
      div._title-box.rounded.gradient-blue-mint.p-1.m-auto
        div.bg-white.p-12.rounded.text-center
          h1.text-lg.sm_text-2xl.md_text-5xl.font-semibold {{ mbEvent.title }}
          p.md_text-xl.py-2 {{ prettyDate }}
    div.p-2.md_p-0.container.m-auto.mb-32
      div.md_flex.mb-16
        div.mb-4.md_mb-0.md_mr-4.shadow-mb.p-10.flex.flex-col.justify-center.text-white.rounded-lg(style="flex-basis: 60%; background: linear-gradient(0deg, black, #3d3d3d);")
          div.mb-6
            h2.text-xl.md_font-normal.md_text-3xl Description
            p {{ mbEvent.description }}
          div
            h2.text-lg.mt-2.md_text-2xl Instructions
            h3 {{ mbEvent.instructions }}

        div.shadow-mb.p-10.flex.flex-col.justify-end.text-white.rounded-lg(style="flex-basis: 40%; background: linear-gradient(0deg, black, #3d3d3d);")
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
            //- mb-internal-link.w-full(to="/auth/login")
            mb-button.w-full(@click="rememberMeLogin") Login
      div.shadow-mb.px-4.py-10

        h2.text-3xl.mb-2.text-center Submissions
        section(v-if="projects && projects.length === 0")
          p No submissions yet. Be the first to submit a project!
        mb-project-grid(v-else :projects="projects")

</template>

<style lang="scss" scoped>
// phones
@media only screen and (max-width: 638px) {
  ._title-box {
    max-width: 70vw;
  }
}
// tablets
@media only screen and (min-width: 639px) {
  ._title-box {
    width: 60vw;
  }
}
// larger than tablets
@media only screen and (min-width: 1023px) {
  ._title-box {
    max-width: 40vw;
  }
}
</style>

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
      return (
        moment(this.mbEvent.start_time).format("dddd, MMMM Do YYYY, ha") +
        " EST"
      );
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
    rememberMeLogin() {
      this.$router.push({
        name: "Login",
        query: { redirect: this.$router.history.current.path }
      });
    },
    clearInputs() {
      this.source_code_url = "";
      this.title = "";
      this.live_url = "";
      this.myFiles = [];
    },
    fetchMbEvent() {
      const self = this;
      const { id } = this.$route.params;

      this.$mbContext.mbEventService
        .fetchMbEvent(id)
        .then(mbEvent => {
          self.mbEvent = mbEvent;
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
          this.clearInputs();
          self.fetchProjects();
          this.$router.go(0);
        })
        .catch(e => {
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
