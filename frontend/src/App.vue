<template lang="pug">
  div
    mb-nav(:path="$route.path")
    //- mb-errors
    router-view
    mb-footer
</template>

<style lang="scss" scoped>

</style>

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
