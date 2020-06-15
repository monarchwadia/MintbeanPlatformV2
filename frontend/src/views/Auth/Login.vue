<template lang="pug">
  section.auth
    form.login-form(v-on:submit.prevent="onSubmit")
      h1 Login
      label Email
        input(name="email", v-model="email" ref="emailInput")
      label Password
        input(name="password", type="password", v-model="password")
      button(type="submit") Submit
</template>

<style lang="scss" scoped>
@import "../../styles/variables";

.auth {
  background-image: url("../../assets/auth-background.jpg");
  height: calc(100vh - #{$navbar-height});
  flex-direction: row-reverse;
  justify-content: right;
}

.login-form {
  background-color: white;
  margin: 100px;
}
</style>

<script>
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
  }
};
</script>
