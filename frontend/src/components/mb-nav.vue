<template lang="pug">
  header
    nav
      ul
        li 
          h1 Mintbean
        li
          span Write code. Get noticed. 
            span.highlight Get hired ➔
      ul
        li
          router-link(to="/") Home
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
  header {
    max-height: 100px
  }

  .highlight {
    background-color: $mintiest;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>

<script>

export default {
  props: {
    path: String
  },
  computed: {
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
