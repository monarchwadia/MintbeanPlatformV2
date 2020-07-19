export default {
  methods: {
    redirectOnLoggedIn() {
      if (this.$store.state.user) {
        this.$router.push("/");
      }
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      this.redirectOnLoggedIn();
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  mounted() {
    this.redirectOnLoggedIn();
  }
};
