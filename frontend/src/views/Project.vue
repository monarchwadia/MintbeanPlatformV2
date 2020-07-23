<template lang="pug">
div
  div.pb-4.w-screen.text-white(style="background: linear-gradient(180deg, black, #3d3d3d);")
    div.container.m-auto.flex.flex-col.lg_flex-row.justify-between
      div
        mb-back-button.mt-4
        h1.text-center.text-4xl.md_text-left.md_text-5xl {{ project.title }}
        p.text-center.md_text-left.text-xl by {{ project.User.firstname }} {{ project.User.lastname }}
      div.flex.self-center.md_self-end.mt-5.text-center
        mb-a-button.mr-4.h-auto.z-99.right-0(isExternal v-if="project.source_code_url" :href="project.source_code_url" ) Source Code
        mb-a-button.h-auto.z-99.right-0(isExternal v-if="project.live_url" :href="project.live_url" ) View Project

  div.container.m-auto
    div(v-if="!!project")
      div
        section.mt-4.p-6.shadow-mb
          aside(v-for="mediaAsset in project.MediaAssets")
            mb-image-display(v-if="mediaAsset.cloudinaryPublicId" :publicId="mediaAsset.cloudinaryPublicId", width="980")
            div.flex.justify-end(v-if="isAdmin")
              button.self-right(v-if="mediaAsset.cloudinaryPublicId" v-on:click.prevent="handleDeleteMediaAsset(mediaAsset)") Delete
        section(v-if="!project.MediaAssets.length")
          p No media uploaded.
          section(v-if="isAdmin")
            aside
              div.flex
                label Upload File
                  mb-file-upload(:files="[]" name="files" ref="mbFileUpload")
                  button(v-on:click.prevent="handleUploadMediaAssets()") Submit

      div.mt-6.flex
        //- left column
        div(style="flex-basis: 40%;")

          div.flex.flex-col.p-6.shadow-mb
            h2.text-2xl.mb-4 About the dev
            div.flex.items-start
              mb-avatar(size="md")
              div.ml-2
                p.text-xl {{ project.User.firstname }} {{ project.User.lastname }}
                mb-external-link(:href="project.User.linkedin_id") Linkedin
                mb-external-link(v-if="project.User.github_id" :href="project.User.github_id") GitHub
                mb-external-link(v-if="project.User.stackoverflow_id" :href="project.User.stackoverflow_id") StackOverflow
          div.flex.flex-col.p-6.shadow-mb
            section(v-if="$store.state.user")
              form.w-full.flex.flex-col(v-on:submit.prevent="function(evt){ handleVoteProject(project.id) }")
                h2.text-2xl.mb-4 {{ userVote ? 'Edit your' : 'Submit a' }} vote
                div.flex.items-center.mb-2
                  mb-avatar(size="sm")
                  em.ml-1 Editing as {{ $store.state.user.firstname }} {{ $store.state.user.lastname }}
                label.mb-2 Your Rating (1 - 10)
                  select.ml-2.p-2(v-model="rating")
                    option 10
                    option 9
                    option 8
                    option 7
                    option 6
                    option 5
                    option 4
                    option 3
                    option 2
                    option 1
                textarea.mb-2.p-2.w-full(name="comment" placeholder="Write a comment" v-model="comment" style="border: solid 2px black;" rows="6")
                mb-button.block(type="submit") {{userVote ? 'Edit' : 'Submit'}}
            section(v-else)
              h2 You must be logged in to vote
            section(v-if="userVote")
              aside(style="width: 100%;")
                h3 (Your previous vote:)
                h2 {{userVote.User.firstname + ' ' + userVote.User.lastname}}
                h3 Rating: {{ userVote.rating }} / 10
                h3 Comments:
                p {{ userVote.comment }}

        //- right column
        div(style="flex-basis: 60%;")
          div.p-6.shadow-mb
            div.flex.justify-between
              h2.text-2xl.mb-4 Votes
              h2.text-right.text-2xl Average Score:  {{averageScore}} / 10
            section(v-if="!project.Votes || project.Votes.length === 0")
              p No comments yet
            section(v-else)
              div(v-for="vote in project.Votes" style="width: 100%;")
                div.flex.mb-3
                  div.flex-shrink-0
                    mb-avatar.self-center(size="md")
                  div.pl-2
                    b.mb-2 {{vote.User.firstname + ' ' + vote.User.lastname}}
                    em.ml-2.text-sm.mb-2 - {{getMoment(vote.createdAt)}}
                    p {{ vote.comment }}

</template>

<script>
import moment from "moment";

// @ is an alias to /src
export default {
  name: "Project",
  data() {
    return {
      comment: "",
      rating: 7
    };
  },
  computed: {
    userVote: function() {
      const { user } = this.$store.state;
      const { project } = this;

      if (!user) return;

      if (!project.Votes) return;

      return project.Votes.find(p => p.User.id === user.id);
    },
    averageScore: function() {
      const { project } = this;
      if (!project) return null;

      const { Votes } = project;
      if (!Votes || Votes.length === 0) return null;

      const score =
        Votes.reduce((prev, curr) => prev + curr.rating, 0) / Votes.length;
      return score.toPrecision(2);
    },
    project: function() {
      return this.$store.state.project;
    },
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMoment(datetime) {
      return moment(datetime, "YYYYMMDD").fromNow();
    },
    handleVoteProject(ProjectId) {
      const { id } = this.$store.state.project;
      const { comment, rating } = this;
      const obj = {
        ProjectId: id,
        comment,
        rating
      };

      console.log(obj);
      this.$store.dispatch("vote", obj);
    },
    handleDeleteMediaAsset(MediaAsset) {
      if (
        !confirm(
          "Are you sure you want to delete this media asset? This action is not reversible."
        )
      ) {
        return;
      }

      const ProjectId = this.$store.state.project.id;
      const MediaAssetId = MediaAsset.id;

      if (ProjectId && MediaAssetId) {
        this.$store.dispatch("deleteMediaAsset", { ProjectId, MediaAssetId });
      }
    },
    handleUploadMediaAssets() {
      const { mbFileUpload } = this.$refs;
      const ProjectId = this.project.id;

      if (!mbFileUpload) {
        alert("Oops: Could not find file upload form");
        return;
      }

      const MediaAssets = this.$refs.mbFileUpload.getFiles().map(f => ({
        cloudinaryPublicId: f.public_id
      }));

      if (MediaAssets.length === 0) {
        alert("Oops: Must have at least 1 file to submit");
        return;
      }

      if (MediaAssets.length > 1) {
        alert(
          "Oops: Found more than 1 file. Currently we only support 1 file."
        );
        return;
      }

      this.$store.dispatch("uploadMediaAssets", { ProjectId, MediaAssets });
    }
  },
  mounted() {
    this.$store.dispatch("fetchProject", this.$route.params.id);
  }
};
</script>
