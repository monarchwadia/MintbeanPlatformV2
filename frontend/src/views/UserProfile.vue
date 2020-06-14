<template lang="pug">
div.wrapper
  div.wrapper-inner
    main.event
      div(v-if="!!userProfile")
        h1 {{ userProfile.firstname }} {{ userProfile.lastname }}

</template>

<style lang="scss" scoped>
@import "../styles/colors";
@import "../styles/mixins";

.event-wrapper-inner {
  padding-top: 100px;
  position: relative;
}

.event {
  background: whitesmoke;
  min-height: 100vh;
  padding-top: 50px;
  border: 1px solid $color-bg-secondary;
  border-radius: $border-radius;
  @include has-box-shadow;
  // margin: 1rem;
  padding: 1.25rem;
}

form {
  width: 100%;
}
</style>

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
