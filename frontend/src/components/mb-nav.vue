<template>
  <div :class="{ ['u-center']: isHome, nav: true }">
    <router-link to="/">
      <div class="nav-item">
        Home
      </div>
    </router-link>
    <a href="#" v-on:click.prevent="logout" v-if="isLoggedIn">
      <div class="nav-item u-right">
        Log Out
      </div>
    </a>
    <router-link to="/auth/login" v-if="!isLoggedIn">
      <div class="nav-item u-right">
        Log In
      </div>
    </router-link>
    <router-link to="/auth/register" v-if="!isLoggedIn">
      <div class="nav-item u-right">
        Register
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/colors";
@import "../styles/dimensions";

.nav {
  padding: 0;
  margin: auto;
  max-width: 100%;
  background-color: $darker;
  position: fixed;
  left: 0;
  right: 0;
  height: $header-height;
  margin-bottom: 0;
  padding-bottom: 0;

  .nav-item {
    $hpadding: 20px;
    display: inline-block;
    height: $header-height;
    line-height: $header-height;
    padding-left: $hpadding;
    padding-right: $hpadding;
    // background-color: Red;
    margin: auto;

    & > * {
        height: 100%;
        width: 100%;
        color: red;
    }
  }

  .u-right {
    float: right;
  }
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
