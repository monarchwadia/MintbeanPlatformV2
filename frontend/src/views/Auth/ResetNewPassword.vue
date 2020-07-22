<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    div(v-if="showInvalid")
      h1.text-xl.pb-6 Invalid or expired token.
      mb-internal-link.block.mb-4(to="/auth/reset")
        mb-button Send new password reset token
      mb-internal-link(to="/") Home
    div(v-else-if="showPasswordForm")
      h1.text-xl.pb-6 Create your new password
      FormulateForm(@submit="onSubmit")
        FormulateInput(
          type="password"
          name="password"
          label="New password"
          validation="required|between:7,65,length"
          validation-name="New password"
          :validation-messages="{ between: 'New password must be between 8 and 64 characters long.'}"
          v-focus-input
        )
        FormulateInput(
          type="password"
          name="password_confirm"
          label="Confirm password"
          validation="required|confirm"
          validation-name="Password confirmation"
        )
        FormulateInput(
          type="submit"
          label="Update password"
        )
    div(v-else)
      h1.text-xl.pb-6.px-12 Loading...
</template>

<script>
import authWrapper from "./auth-wrapper";
import authYouAgree from "./auth-you-agree.vue";
import base64ToObj from "../../helpers/base64ToObj";

export default {
  name: "ResetNewPassword",
  data() {
    return {
      email: "",
      token: "",
      showInvalid: false,
      showPasswordForm: false
    };
  },
  methods: {
    onSubmit(data) {
      // be double sure of validation
      if (data.password === data.password_confirm) {
        const decodedToken = base64ToObj(this.token).token;
        const email = this.email;
        const response = this.$mbContext.authService
          .resetPassword(data.password, decodedToken, email)
          .then(res => {
            console.log(res);
            if (res.err) {
              alert(`Error: ${res.err}`);
            } else {
              alert(`Successfully updated password!`);
            }
            this.$router.push("/auth/login");
          })
          .catch(err => {
            alert(`Reset token is either invalid or expired. Send a new token`);
            this.$router.push("/auth/reset");
          });
      } else {
        alert("passwords do not match");
      }
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
  async mounted() {
    // verify token, show invalid message if invalid
    const { token } = this.$route.params;
    const tokenObj = base64ToObj(token);
    if (!tokenObj) {
      this.showInvalidMsg();
      return;
    }
    try {
      const res = await this.$mbContext.authService.checkPasswordResetToken(
        tokenObj
      );
      this.email = res.email;
      this.token = token;
      this.showPasswordFormMsg();
    } catch {
      console.log("error");
      alert("Something went wrong");
    }
  },
  components: {
    "auth-wrapper": authWrapper,
    "auth-you-agree": authYouAgree
  }
};
</script>
