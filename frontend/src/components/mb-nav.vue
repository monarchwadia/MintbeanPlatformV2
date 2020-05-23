<template>
  <div :class="{ ['u-center']: isHome, nav: true }">
    <router-link to="/">
      <div class="nav-item">
        Home
      </div>
    </router-link>
    <router-link to="/for-educators">
      <div class="nav-item">
        For Educators
      </div>
    </router-link>
    <router-link to="/auth/logout" v-if="isLoggedIn">
      <div class="nav-item">
        Log Out
      </div>
    </router-link>
    <router-link to="/auth/login" v-if="!isLoggedIn">
      <div class="nav-item">
        Log In
      </div>
    </router-link>
    <router-link to="/auth/register" v-if="!isLoggedIn">
      <div class="nav-item">
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
    },
    loginUrl() {
      return this.$store.state.loginUrl;
    },
    logoutUrl() {
      return this.$store.state.logoutUrl;
    },
    registerUrl() {
      return this.$store.state.registerUrl;
    }
  }
};
</script>
