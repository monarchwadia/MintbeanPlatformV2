<template lang="pug">
  div#app
    mb-nav(:path="$route.path")
    router-view
    footer Made by Mintbean, Copyright 2020 All Rights Reserved. Aside images designed by Freepik.
</template>

<style lang="scss" scoped>
@import "./styles/colors";
@import "./styles/variables";

footer {
  color: $lightest;
  max-height: $footer-height;
  height: $footer-height;
}
</style>

<script>
const intercomPayload = user => {
  return {
    user_id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email
  };
};

export default {
  name: "App",
  data() {
    return {
      errorMessage: null
    };
  },
  created() {
    this.$store.dispatch("checkAuth");
    this.$store.dispatch("fetchMbEvents");
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  mounted() {
    if (this.user) {
      this.$intercom.boot(intercomPayload(this.user));
    } else {
      this.$intercom.boot();
    }
  },
  watch: {
    user() {
      if (this.user) {
        this.$intercom.update(intercomPayload(this.user));
      } else {
        this.$intercom.shutdown();
        this.$intercom.boot();
      }
    }
  }
};
</script>
