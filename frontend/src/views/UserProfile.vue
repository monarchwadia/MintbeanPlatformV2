<template lang="pug">
div.wrapper
  div.wrapper-inner
    main.event
      div(v-if="!!userProfile")
        h1 {{ userProfile.firstname }} {{ userProfile.lastname }}

</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src
export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: null
    };
  },
  created: function() {
    this.$mbContext.userProfileService
      .fetchUserProfile(this.$route.params.id)
      .then(userProfile => {
        this.userProfile = userProfile;
      })
      .catch(e => alert("Failed to fetch user profile"));
  }
};
</script>
