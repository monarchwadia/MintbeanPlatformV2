<template lang="pug">
  header
    nav
      ul
        li 
          h1 Mintbean
        li
          span Build. Show. Repeat.
      ul
        li
          router-link(to="/") Home
        li
          a(href="#", v-on:click.prevent="logout" v-if="isLoggedIn") Log Out
        li
          router-link(to="/auth/login" v-if="!isLoggedIn") Log In
        li
          router-link(to="/auth/register" v-if="!isLoggedIn") Register
</template>

<style lang="scss" scoped>
  header {
    max-height: 100px
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
