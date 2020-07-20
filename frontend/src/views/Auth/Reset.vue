<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Reset your password
    mb-label Email
      mb-input(:value.sync="email" name="email", ref="emailInput" style="min-width: 280px;")
    auth-you-agree
    mb-button.my-4(type="submit") Send reset link
    mb-internal-link(to="/auth/register").text-sm.text-center Not a member yet? Sign Up
</template>

<script>
import authWrapper from "./auth-wrapper";
import authYouAgree from "./auth-you-agree";
import disallowAuthenticatedUser from "../../mixins/disallowAuthenticatedUser";

export default {
  name: "Reset",
  mixins: [disallowAuthenticatedUser],
  data() {
    return {
      email: ""
    };
  },
  methods: {
    onSubmit(evt) {
      const { email, $router, $route } = this;
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
