<template lang="pug">
div.event-wrapper
  div.event-wrapper-inner
    div.background-banner
    main.event
      div(v-if="!!mbEvent")
        h1 {{ mbEvent.title }}
        h3 Description
        p {{ mbEvent.description }}
        h3 Instructions
        p {{ mbEvent.instructions }}
        h3 Date & Time
        p {{ prettyDate }}
        h3 Submissions
        section(v-if="mbEvent && mbEvent.Projects.length === 0")
          p No submissions yet. Be the first to submit a project!
        section(v-else)
          aside(v-for="project in mbEvent.Projects")
            mb-image-display(:publicId="project.MediaAssets && project.MediaAssets[0] && project.MediaAssets[0].cloudinaryPublicId" height="285" width="285")
            h2 {{ project.title }}
            p
              router-link(:to="'/project/' + project.id") View Project
        section(v-if="submitFormState.enabled")
          form.submit-project-form(v-on:submit.prevent="handleSubmitProject")
            h1 Submit a Project
            div.flex
              label Title
                input(name="title", v-model="title")
              label Source Code URL
                input(name="source_code_url", v-model="source_code_url")
              label Deployment URL
                input(name="live_url", v-model="live_url")
              button(type="submit") Submit
            div.flex
              label Screenshots & Videos
                mb-file-upload(:files="myFiles" name="files" ref="mbFileUpload")
              
        section(v-else)
          h1 {{ submitFormState.disabledMessage }}
        section(v-if="submitFormState.showLoginButton")
          router-link(to="/auth/login")
            button Login
          

</template>

<style lang="scss" scoped>
@import "../styles/colors";

.background-banner {
  background: rgb(2,237,157);
  background: -moz-linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  background: -webkit-linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  background: linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#02ed9d",endColorstr="#009be2",GradientType=1);
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  min-height: 300px;
}

.event-wrapper-inner {
  padding-top: 100px;
  position: relative;
}

.event {
  background: whitesmoke;
  min-height: 100vh;
  padding-top: 50px;
  border: 1px solid var(--color-bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow) var(--color-shadow);
  // margin: 1rem;
  padding: 1.25rem;
  &:hover {
    box-shadow: var(--box-shadow) var(--color-bg-secondary);
  }
}

form.submit-project-form {
  width: 100%;
  max-width: unset;
  margin: 20px;
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;

  background-color: $less-blue;
  color: white;

  input {
    width: 80%;
  }

  & > h1 {
    width: 100%;
  }

  & > .flex {
    flex: 0 0 50%;
    vertical-align: top;
    min-width: var(--width-card-medium)
  }

  & > .inline {
    flex: 0 0 100%;
  }
}
</style>

<script>
import moment from 'moment';

// @ is an alias to /src
export default {
  name: "Event",
  data() {
    return {
      source_code_url: '',
      title: '',
      live_url: '',
      myFiles: []
    }
  },
  computed: {
    prettyDate: function() {
      if (!this.mbEvent.start_time) {
        return '';
      }
      return moment(this.mbEvent.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
    mbEvent: function() {
      const { id } = this.$route.params;
      const { state } = this.$store;
      const { mbEvents } = state;
      const votes = state.votes || [];
      console.log("VOTES", votes);

      if (!id || !mbEvents) {
        return;
      }


      const mbEvent = this.$store.state.mbEvents.find(x => x.id === id);

      return mbEvent;
    },
    submitFormState: function() {
      const { user } = this.$store.state;

      if (!user) {
        return {
          enabled: false,
          disabledMessage: "You must be logged in to submit a project.",
          showLoginButton: true
        }
      }

      if (this.mbEvent.Projects.find(project => project.UserId === user.id)) {
        return {
          enabled: false,
          disabledMessage: "Thank you for submitting your project.",
          showLoginButton: false
        }
      }

      return {
        enabled: true,
        disabledMessage: undefined,
        showLoginButton: false
      }
    }
  },
  methods: {
    handleSubmitProject() {
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

      this.$store.dispatch('submitProject', {
        title,
        source_code_url,
        live_url,
        MbEventId: this.mbEvent.id,
        MediaAssets
      });
    }
  }
};
</script>
