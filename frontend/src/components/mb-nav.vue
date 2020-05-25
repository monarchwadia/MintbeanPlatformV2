<template lang="pug">
  header
    nav
      ul
        li 
          h1 Mintbean
        li
          span Write code. Get noticed. 
            i.highlight Get hired ➔
      ul
        li
          router-link(to="/") Home
      ul
        li
          router-link(to="/mb-events") Events
        li
          a(href="#", v-on:click.prevent="logout" v-if="isLoggedIn") Log Out
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
    isHome() {
      return this.path === "/";
    },
    username() {
      const user = this.$store.state.user;
      return user.firstName + " " + user.lastName;
    },
    isLoggedIn() {
      return !!this.$store.state.user;
    }
  },
  methods: {
    logout(evt) {
      this.$store.dispatch('logout')
    }
  }
};
</script>
