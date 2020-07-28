<template lang="pug">
  header.px-5.pt-2.pb-3.md_pt-0.md_pb-0.md_px-12
    div.flex.items-center.justify-between
      div
        mb-internal-link(to="/")
          img.h-12(:src="mintbeanLogo" alt="Mintbean Logo")

      div.flex.items-right.justify-between.px-4.py-3
        mb-nav-links(:links="links")

        div.md_hidden
          button.block.text-black.focus_outline-none(@click="isOpen = !isOpen" type="button")

            svg.h-6.w-6.fill-current(viewBox="0 0 24 24")
              path(v-if="isOpen"
                fill-rule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z")
              path(v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z")

    mb-nav-links(:links="links" v-if="isOpen" :forResponsive="true")

</template>

<script>
import mintbeanLogo from "../../src/assets/mintbean-logo.png";
import mbNavLinks from "./mb-nav-links";

export default {
  name: "mb-nav",
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
          type: "internal",
          ref: "/auth/logout"
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
