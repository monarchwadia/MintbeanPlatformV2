<template lang="pug">
auth-wrapper
  form.flex.rounded-md.flex-col.p-12.bg-white.align-center.justify-center(style="min-height: 400px;" v-on:submit="onSubmit")
    h1(class="text-xl pb-6") Logging out...
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: "Logout",
  mounted() {
    const action = () => this.$router.push("/");
    this.$store
      .dispatch("logout")
      .then(action)
      .catch(action);
  }
};
</script>
