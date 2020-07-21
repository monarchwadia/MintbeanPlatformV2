<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Create your new password
    mb-label New Password
      mb-input(:value.sync="email" type="password" name="password", ref="focusInput")
    mb-label Confirm Password
      mb-input(:value.sync="passwordConfirm" name="passwordConfirm" type="passwordConfirm")
    auth-you-agree
    mb-button.my-4(type="submit") Continue
    mb-internal-link(to="/auth/register").text-sm.text-center Not a member yet? Sign Up
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper";
import authYouAgree from "./auth-you-agree.vue";

export default {
  name: "ResetNewPassword",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(evt) {
      const { email, password, $router, $route } = this;
      this.$store.dispatch("login", { email, password, $router, $route });
    }
  },
  mounted() {
    const { token } = this.$route.params;

    console.log(this.$mbContext.authService.checkPasswordResetToken(token));

    this.$refs.focusInput.$el && this.$refs.focusInput.$el.focus();
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  }
};
</script>
