<template lang="pug">
div.project-wrapper
  div.project-wrapper-inner
    div.background-banner
    main.project
      div(v-if="!!project")
        h1 {{ project.title }}
        h3 Author
        p {{ project.User.firstname }} {{ project.User.lastname }}
        h3(v-if="project.source_code_url") Source Code
        mb-a(:href="project.source_code_url") Click here to see source code
        h3(v-if="project.live_url") View Project
        mb-a(:href="project.live_url") Click here to view the project
        div
          h2 Media
          div(v-for="mediaAsset in project.MediaAssets")
            mb-image-display(v-if="mediaAsset.cloudinaryPublicId" :publicId="mediaAsset.cloudinaryPublicId", width="1000" height="1000")
        h1 Score: {{averageScore}} / 10
        h1 Votes
        section(v-if="!project.Votes || project.Votes.length === 0")
          p No comments yet
        section(v-else)
          aside(v-for="vote in project.Votes" style="width: 100%;")
            h2 {{vote.User.firstname + ' ' + vote.User.lastname}}
            h3 Comments:
            p {{ vote.comment }}
        section(v-if="$store.state.user")
          form.vote-project(v-on:submit.prevent="function(evt){ handleVoteProject(project.id) }")
            h2 {{ userVote ? 'Edit' : 'Submit' }} a vote
            p {{ userVote ? 'Editing' : 'Editing' }} as {{ $store.state.user.firstname }} {{ $store.state.user.lastname }}
            label Rating (1 - 10)
              input(name="rating", v-model="rating")
            label Comment
              textarea(name="comment", v-model="comment")
            input(type="submit" :value="userVote ? 'Edit' : 'Submit'")
        section(v-else)
          h2 You must be logged in to vote
        section(v-if="userVote")
          aside(style="width: 100%;")
            h3 (Your previous vote:)
            h2 {{userVote.User.firstname + ' ' + userVote.User.lastname}}
            h3 Rating: {{ userVote.rating }} / 10
            h3 Comments:
            p {{ userVote.comment }}

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

.project-wrapper-inner {
  padding-top: 100px;
  position: relative;
}

.project {
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

form {
  width: 100%;
}
</style>

<script>
import moment from 'moment';

// @ is an alias to /src
export default {
  name: "Project",
  data() {
    return {
      comment: '',
      rating: 7
    }
  },
  computed: {
    userVote: function() {
      const { user } = this.$store.state;
      const { project } = this;

      if (!user) return;

      if (!project.Votes) return;

      return (project.Votes.find(p => p.User.id === user.id))
    },
    averageScore: function() {
      const { project } = this;
      if (!project) return null;

      const { Votes } = project;
      if (!Votes || Votes.length === 0) return null;

      const score = Votes.reduce((prev, curr) => prev + curr.rating, 0) / Votes.length;
      return score.toPrecision(2);
    },
    project: function() {
      return this.$store.state.project;
    }
    // prettyDate: function() {
    //   if (!this.mbEvent.start_time) {
    //     return '';
    //   }
    //   return moment(this.mbEvent.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
    // }
  },
  methods: {
    handleVoteProject(ProjectId) {
      const { id } = this.$store.state.project;
      const { comment, rating } = this;
      const obj = {
        ProjectId: id, comment, rating
      }

      console.log(obj);
      this.$store.dispatch('vote', obj);
    },
  },
  mounted() {
    this.$store.dispatch("fetchProject", this.$route.params.id);
  },
};
</script>
