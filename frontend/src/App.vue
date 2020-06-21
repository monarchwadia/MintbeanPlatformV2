<template lang="pug">
  div
    mb-nav(:path="$route.path")
    //- mb-errors
    router-view
    mb-footer
    div(class="sm_hidden fixed top-0 right-0 bottom-0 left-0 gradient-blue-mint flex flex-row m-auto align-middle justify-center z-50 text-white")
      div(class="text-center max-w-md" style="padding-top: 20vh")
        div.text-5xl Sorry :(
        div.text-3xl Smaller screens are currently not supported. (But we're working on it!)


</template>

<style lang="scss" scoped></style>

<script>
import MbErrors from "./components/mb-errors";

const intercomPayload = user => {
  return {
    user_id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email
  };
};

export default {
  name: "App",
  data() {
    return {
      errorMessage: null
    };
  },
  created() {
    this.$store.dispatch("checkAuth");
    this.$store.dispatch("fetchMbEvents");
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  mounted() {
    if (this.user) {
      this.$intercom.boot(intercomPayload(this.user));
    } else {
      this.$intercom.boot();
    }
  },
  watch: {
    user() {
      if (this.user) {
        this.$intercom.update(intercomPayload(this.user));
      } else {
        this.$intercom.shutdown();
        this.$intercom.boot();
      }
    }
  },
  components: {
    "mb-errors": MbErrors
  }
};
</script>
