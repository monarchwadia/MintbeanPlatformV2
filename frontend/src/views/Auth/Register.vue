<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit.prevent="onSubmit")
    h1(class="text-xl pb-6") Sign up to Mintbean
    FormulateForm(@submit="onSubmit($event)")
      FormulateInput(
        type="text"
        name="firstname"
        label="First name"
        validation-name="First name"
        /* v-focus-input */
        v-model="firstname"
        v-focus-input
      )
      FormulateInput(
        type="text"
        name="lastname"
        label="Last name"
        validation-name="Last name"
        v-model="lastname"
      )
      FormulateInput(
        type="email"
        name="email"
        label="Email"
        v-model="email"
      )

      FormulateInput(
        type="password"
        name="password"
        label="Password"
        validation="required|between:7,65,length"
        validation-name="New password"
        :validation-messages="{ between: 'New password must be between 8 and 64 characters long.'}"
        v-model="password"
      )
      FormulateInput(
        type="submit"
        label="Continue"
      )
    auth-you-agree
    mb-internal-link(to="/auth/login").text-sm.text-center Already a member? Sign In
</template>

<style lang="scss" scoped></style>

<script>
import authWrapper from "./auth-wrapper.vue";
import authYouAgree from "./auth-you-agree.vue";
import disallowAuthenticatedUser from "../../mixins/disallowAuthenticatedUser";

export default {
  name: "Login",
  mixins: [disallowAuthenticatedUser],
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    };
  },
  methods: {
    onSubmit() {
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
