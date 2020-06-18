<template lang="pug">
nav.mb-nav
  router-link(to="/")
    img.logo(:src="mintbeanLogo")
  div.links
    router-link(to="/") 
      div Home
    a(v-if="isLoggedIn" href="#" v-on:click.prevent="logout")
      div Log Out
    router-link(to="/admin" v-if="isLoggedIn && isAdmin") 
      div Admin
    router-link(to="/auth/login" v-if="!isLoggedIn") 
      div Log In
    router-link(to="/auth/register" v-if="!isLoggedIn") 
      div Register
</template>

<style lang="scss" scoped>

</style>

<script>
import mintbeanLogo from "../../src/assets/mintbean-logo.png";

export default {
  props: {
    path: String
  },
  computed: {
    mintbeanLogo() {
      return mintbeanLogo;
    },
    user() {
      return this.$store.state && this.$store.state.user;
    },
    isHome() {
      return this.path === "/";
    },
    isAdmin() {
      return this.user && this.user.isAdmin;
    },
    username() {
      return this.user.firstName + " " + this.user.lastName;
    },
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    logout(evt) {
      this.$store.dispatch("logout");
    }
  }
};
</script>
