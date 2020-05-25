<template lang="pug">
  section
    form.login-form(v-on:submit.prevent="onSubmit")
      h1 Login
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
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit(evt) {
      const { email, password, $router } = this;
      this.$store.dispatch('login', { email, password, $router });
    }
  }
};
</script>
