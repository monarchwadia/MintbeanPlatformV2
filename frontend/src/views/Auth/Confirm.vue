<template lang="pug">
div.mx-auto.container.flex.flex-col.items-center
  img.w-full(:src="imgWelcome" alt="A group of creators getting ready to build something" style="max-width: 600px;")
  div.text-center
    h2.md_text-2xl(v-if="showError") Something went wrong.
    h2.md_text-2xl(v-else-if="showAlreadyConfirmed") You've already confirmed your account, {{firstname}}!
    h2.md_text-2xl(v-else-if="showSuccess") We're happy you're here, {{firstname}}!
  mb-internal-link.mt-4(v-if="!isLoggedIn" to="/auth/login/")
    mb-button Login
</template>

<script>
import imgWelcome from "../../assets/sliders/repeat.png";
import base64ToObj from "../../helpers/base64ToObj";

export default {
  name: "Confirm",
  data() {
    return {
      imgWelcome,
      firstname: "",
      showError: false,
      showSuccess: false,
      showAlreadyConfirmed: false,
      isLoggedIn: false
    };
  },
  methods: {
    getTokenObj() {
      const { token } = this.$route.params;

      return base64ToObj(token);
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async mounted() {
    const tokenObj = this.getTokenObj();

    if (
      !tokenObj ||
      !tokenObj.email ||
      !tokenObj.firstname ||
      !tokenObj.token
    ) {
      this.showError = true;
      return;
    }

    // finalize confirmation
    try {
      const res = await this.$mbContext.authService.confirmUser({
        email: tokenObj.email,
        token: tokenObj.token
      });

      const { firstname } = tokenObj;
      this.firstname = firstname;

      if (res.type === "success") {
        this.showSuccess = true;
      } else if (res.type === "already-confirmed") {
        this.showAlreadyConfirmed = true;
      }

      if (this.user) {
        this.isLoggedIn = true;
        this.$forceUpdate();
      }
    } catch (e) {
      alert(e);
    }
  }
};
</script>
