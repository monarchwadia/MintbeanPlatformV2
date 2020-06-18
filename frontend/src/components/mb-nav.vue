<template>
  <header class>
    <div class="flex items-center justify-between px-4 py-3">
      <div>
        <router-link to="/" class="block">
          <img :src="mintbeanLogo" class="h-8" alt="Mintbean Logo">
        </router-link>
      </div>

      <div class="flex items-right justify-between px-4 py-3">
        <mb-nav-links :links="links"/>

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="block text-black focus:outline-none">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
              <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <mb-nav-links :links="links" v-if="isOpen" :forResponsive="true"/>
  </header>
</template>

<script>
import mintbeanLogo from "../../src/assets/mintbean-logo.png";
import mbNavLinks from "./mb-nav-links";

export default {
  props: {
    path: String
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    links() {
          // <router-link to="/" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800">
          //   Home
          // </router-link>
          // <a v-if="isLoggedIn" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800" href="#" v-on:click.prevent="logout">
          //   Log Out
          // </a>
          // <router-link v-if="isLoggedIn && isAdmin" to="/admin" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800">
          //   Admin
          // </router-link>
          // <router-link v-if="!isLoggedIn" to="/auth/login" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800">
          //   Log In
          // </router-link>
          // <router-link v-if="!isLoggedIn" to="/auth/register" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800">
          //   Register
          // </router-link>
      return [
        { label: 'Home', showIf: true, linkTo: '/' },
        { label: 'Log Out', showIf: this.isLoggedIn, onClick: this.logout },
        { label: 'Admin', showIf: this.isLoggedIn && this.isAdmin, linkTo: '/admin' },
        { label: 'Log In', showIf: !this.isLoggedIn, linkTo: '/auth/login' },
        { label: 'Register', showIf: !this.isLoggedIn, linkTo: '/auth/register' },
      ].filter((link => link.showIf ))
    },
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
  },
  components: {
    "mb-nav-links": mbNavLinks
  }
};
</script>
