<template lang="pug">
auth-wrapper
  auth-form(v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Sign up to Mintbean
    mb-label First Name
      mb-input(name="firstname", v-model="firstname")
    mb-label Last Name
      mb-input(name="lastname", v-model="lastname")
    mb-label Email
      mb-input(name="email", v-model="email")
    mb-label Password
      mb-input(name="password", type="password", v-model="password")
    auth-you-agree
    mb-button.my-4(type="submit") Continue
    mb-internal-link(to="/auth/login").text-sm.text-center Already a member? Sign In
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper.vue";
import authForm from "./auth-form.vue";
import authYouAgree from "./auth-you-agree.vue";

export default {
  name: "Login",
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
  components: {
    "auth-wrapper": authWrapper,
    "auth-form": authForm,
    "auth-you-agree": authYouAgree
  }
};
</script>
