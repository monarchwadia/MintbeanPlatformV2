<template lang="pug">
  .mb-errors
    transition(name="fade" v-for="e in mbErrors")
      .mb-error-card(@click="handleCloseError(e)")
        div.close-button x
        b {{ e.title }} {{ e.id }}
        p {{ e.description }}

</template>

<style lang="scss" scoped>
@import "../styles/utils";
@import "../styles/colors";

$card-height: 70px;
$card-padding: 10px;

.mb-errors {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: auto;
  width: 100%;
}

.mb-error-card {
  position: relative;
  background-color: red;
  border: 1px solid darkred;
  color: white;
  width: 450px;
  max-width: 700px;
  padding: $card-padding;
  min-height: $card-height;
  margin: 25px auto 0 auto;
  cursor: pointer;
  line-height: 15px;
  font-size: 15px;
  p {
    margin: 12px 0 0 0;
  }
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
}


</style>

<script>
export default {
  name: "mb-errors",
  computed: {
    mbErrors() {
      return this.$store.state.mbErrors;
    },
  },
  methods: {
    handleCloseError(e) {
      this.$store.dispatch('errorPush', e)
    }
  }
};
</script>
