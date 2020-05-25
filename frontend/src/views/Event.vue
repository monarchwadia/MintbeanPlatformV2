<template lang="pug">
div.event-wrapper
  div.event-wrapper-inner
    div.background-banner
    main.event
      div(v-if="!!mbEvent")
        h1 {{ mbEvent.title }}
        h3 Description
        p {{ mbEvent.description }}
        h3 Instructions
        p {{ mbEvent.instructions }}
        h3 Schedule
        p {{ mbEvent.start_time }}
</template>

<style lang="scss" scoped>
@import "../styles/colors";

.background-banner {
  background: rgb(2,237,157);
  background: -moz-linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  background: -webkit-linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  background: linear-gradient(175deg, rgba(2,237,157,1) 0%, rgba(0,155,226,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#02ed9d",endColorstr="#009be2",GradientType=1);
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  min-height: 300px;
}

.event-wrapper-inner {
  padding-top: 100px;
  position: relative;
}

.event {
  background: whitesmoke;
  min-height: 100vh;
  padding-top: 50px;
  border: 1px solid var(--color-bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow) var(--color-shadow);
  // margin: 1rem;
  padding: 1.25rem;
  &:hover {
    box-shadow: var(--box-shadow) var(--color-bg-secondary);
  }
}
</style>

<script>
// @ is an alias to /src
export default {
  name: "Event",
  computed: {
    mbEvent: function() {
      const { id } = this.$route.params;
      const { mbEvents } = this.$store.state;

      if (!id || !mbEvents) {
        return;
      }

      return this.$store.state.mbEvents.find(x => x.id === id);
    }
  }
};
</script>
