<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Reset your password
    FormulateForm(@submit="onSubmit($event)")
      FormulateInput(
        type="email"
        name="email"
        label="Email"
        v-model="email"
        validation="email"
        v-focus-input
      )
    auth-you-agree
    div(v-if="emailIsSent")
      p.font-semibold.text-mb-tone-500.text-center A reset token was sent to this email address,
      p.font-semibold.text-mb-tone-500.text-center if it belongs to a valid Mintbean account
    mb-button.my-4(v-if="!emailIsSent" type="submit") Send reset link
    mb-button.my-4(v-else type="submit") Resend reset link
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
      email: "",
      emailIsSent: false
    };
  },
  methods: {
    onSubmit() {
      const { email } = this;
      this.$mbContext.authService.sendResetToken(email);
      this.emailIsSent = true;
      this.$forceUpdate();
    }
  },
  directives: {
    focusInput: {
      inserted: function(el) {
        const input = el.querySelector("input");
        if (input) {
          input.focus();
        }
      }
    }
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  }
};
</script>
