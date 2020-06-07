<template lang="pug">
nav.mb-nav
  ul
    li
      div(style="font-weight: bolder") Mintbean
  ul
    li
      a(href="#", v-on:click.prevent="logout" v-if="isLoggedIn") Log Out
    li
      router-link(to="/admin" v-if="isLoggedIn && isAdmin") Admin
    li
      router-link(to="/auth/login" v-if="!isLoggedIn") Log In
    li
      router-link(to="/auth/register" v-if="!isLoggedIn") Register
</template>

<style lang="scss" scoped>
@import "../styles/colors";

$navbar-height: 100px;

.mb-nav {
  max-height: $navbar-height;
  line-height: $navbar-height;
  margin-bottom: 0px;
  .highlight {
    background-color: $mintiest;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

<script>
import logo from "../../src/assets/logo-small.png";

export default {
  props: {
    path: String
  },
  computed: {
    logo() {
      return logo;
    },
    user() {
      return this.$store.state && this.$store.state.user;
    },
    isHome() {
      return this.path === "/";
    },
    isAdmin() {
      return this.user && this.user.isAdmin
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
      this.$store.dispatch('logout')
    }
  }
};
</script>
