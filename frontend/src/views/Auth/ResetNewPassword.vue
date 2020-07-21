<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    div(v-if="showInvalid")
      h1.text-xl.pb-6 Invalid or expired token.
      mb-internal-link(to="/") Home
    div(v-else-if="showPasswordForm")
      h1.text-xl.pb-6 Create your new password
      mb-label New Password
        mb-input(:value.sync="email" type="password" name="password", ref="focusInput")
      mb-label Confirm Password
        mb-input(:value.sync="passwordConfirm" name="passwordConfirm" type="passwordConfirm")
      auth-you-agree
      mb-button.my-4.block(type="submit") Continue
    div(v-else)
      h1.text-xl.pb-6.px-12 Loading...
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper";
import authYouAgree from "./auth-you-agree.vue";
import base64ToObj from "../../helpers/base64ToObj";

export default {
  name: "ResetNewPassword",
  data() {
    return {
      email: "",
      password: "",
      showInvalid: false,
      showPasswordForm: false
    };
  },
  methods: {
    onSubmit(evt) {
      const { email, password, $router, $route } = this;
      this.$store.dispatch("login", { email, password, $router, $route });
    },
    showInvalidMsg() {
      this.showInvalid = true;
      this.$forceUpdate();
    },
    showPasswordFormMsg() {
      this.showPasswordForm = true;
      this.$forceUpdate();
    }
  },
  mounted() {
    // verify token, show invalid message if not
    const { token } = this.$route.params;
    const tokenObj = base64ToObj(token);
    if (!tokenObj) {
      this.showInvalidMsg();
      console.log("invalid!");
    }
    try {
      const res = this.$mbContext.authService.checkPasswordResetToken(tokenObj);
      this.showPasswordFormMsg();
    } catch {
      console.log("error");
    }

    // this.$refs.focusInput.$el && this.$refs.focusInput.$el.focus();
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  }
};
</script>
