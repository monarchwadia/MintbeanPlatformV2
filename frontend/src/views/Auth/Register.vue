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
        validation='email'
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
  },
  computed: {
    emailValidator() {
      /* eslint-disable */
      console.log(
        "matches: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/"
      );
      return "matches: /^[^@\s]+@[^@\s]+\.[^@\s]+$/";
      /* eslint-enable */
    }
  }
};
</script>
