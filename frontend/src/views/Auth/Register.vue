<template lang="pug">
  section.auth
    form.login-form(v-on:submit.prevent="onSubmit")
      h1 Register
      label First Name
        input(name="firstname", v-model="firstname")
      label Last Name
        input(name="lastname", v-model="lastname")
      label Email
        input(name="email", v-model="email")
      label Password
        input(name="password", type="password", v-model="password")
      button(type="submit") Submit
</template>

<style lang="scss" scoped>

</style>

<script>
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
  }
};
</script>
