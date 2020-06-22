<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Sign up to Mintbean
    mb-label First Name
      mb-input(name="firstname", :value.sync="firstname" ref="firstnameInput")
    mb-label Last Name
      mb-input(name="lastname", :value.sync="lastname")
    mb-label Email
      mb-input(name="email", :value.sync="email")
    mb-label Password
      mb-input(name="password", type="password", :value.sync="password")
    auth-you-agree
    mb-button.my-4(type="submit") Continue
    mb-internal-link(to="/auth/login").text-sm.text-center Already a member? Sign In
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper.vue";
import authYouAgree from "./auth-you-agree.vue";
import disallowAuthenticatedUser from "../../mixins/disallowAuthenticatedUser";

export default {
  name: "Login",
  mixins: [disallowAuthenticatedUser],
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    };
  },
  methods: {
    onSubmit(evt) {
      const { email, password, firstname, lastname, $router } = this;
      this.$store.dispatch("register", {
        email,
        password,
        firstname,
        lastname,
        $router
      });
    }
  },
  mounted() {
    this.$refs.firstnameInput.$el && this.$refs.firstnameInput.$el.focus();
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  },
};
</script>
