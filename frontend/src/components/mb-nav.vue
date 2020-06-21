<template>
  <header class="px-12">
    <div class="flex items-center justify-between">
      <div>
        <router-link to="/" class="block">
          <img :src="mintbeanLogo" class="h-12" alt="Mintbean Logo" />
        </router-link>
      </div>

      <div class="flex items-right justify-between px-4 py-3">
        <mb-nav-links :links="links" />

        <div class="md_hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="block text-black focus:outline-none"
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                v-if="isOpen"
                fill-rule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
              <path
                v-if="!isOpen"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <mb-nav-links :links="links" v-if="isOpen" :forResponsive="true" />
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
    };
  },
  computed: {
    links() {
      return [
        { label: "Home", hidden: false, type: "internal", ref: "/" },
        {
          label: "Log Out",
          hidden: !this.isLoggedIn,
          type: "action",
          ref: this.logout
        },
        {
          label: "Admin",
          hidden: !(this.isLoggedIn && this.isAdmin),
          type: "internal",
          ref: "/admin"
        },
        {
          label: "Sign In",
          hidden: this.isLoggedIn,
          type: "internal",
          ref: "/auth/login"
        },
        {
          label: "Sign Up",
          hidden: this.isLoggedIn,
          type: "internal",
          ref: "/auth/register"
        }
      ].filter(link => !link.hidden);
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
