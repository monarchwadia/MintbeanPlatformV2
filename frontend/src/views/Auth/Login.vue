<template lang="pug">
auth-wrapper
  auth-form(v-on:submit.prevent="onSubmit")
    h1(class="text-lg pb-6") Sign in to Mintbean
    mb-label Email
      mb-input(name="email", v-model="email" ref="emailInput")
    mb-label Password
      mb-input(name="password", type="password", v-model="password")
    mb-button.my-4(type="submit") Continue
    span.text-xs.text-center Haven't joined yet? 
      router-link(to="/auth/register") Sign Up
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper";
import authForm from "./auth-form";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(evt) {
      const { email, password, $router } = this;
      this.$store.dispatch("login", { email, password, $router });
    }
  },
  mounted() {
    this.$refs.emailInput && this.$refs.emailInput.focus();
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-form": authForm
  }
};
</script>
