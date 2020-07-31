<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Sign in to Mintbean
    mb-label Email
      mb-input(:value.sync="email" type="email" name="email", ref="emailInput")
    mb-label Password
      mb-input(:value.sync="password" name="password" type="password")
    mb-internal-link.text-sm(to="/auth/reset") Forgot your password?
    auth-you-agree
    mb-button.my-4(type="submit") Continue
    mb-internal-link(to="/auth/register").text-sm.text-center Not a member yet? Sign Up
</template>

<script>
import authWrapper from "./auth-wrapper";
import authYouAgree from "./auth-you-agree.vue";
import disallowAuthenticatedUser from "../../mixins/disallowAuthenticatedUser";

export default {
  name: "Login",
  mixins: [disallowAuthenticatedUser],
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const { email, password, $router, $route } = this;
      this.$store.dispatch("login", { email, password, $router, $route });
    }
  },
  mounted() {
    this.$refs.emailInput.$el && this.$refs.emailInput.$el.focus();
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  }
};
</script>
