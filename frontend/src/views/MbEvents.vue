<template lang="pug">
  div
    mb-banner(
      title="Events"
      backRefTitle="Home",
      backRefPath="/"
    )
    div.container.m-auto.pt-24
      mb-event-section(:events="events")
</template>

<script>
import moment from "moment";

// @ is an alias to /src
export default {
  name: "Events",
  data() {
    return {
      events: []
    };
  },
  methods: {
    fetchEvents() {
      const self = this;
      const nowUTC = moment(new Date());

      this.$mbContext.mbEventService
        .getMbEvents()
        .then(events => {
          // TODO: remove this map in prod, adds fake image
          events = events.sort((a, b) => {
            // to reverse chronological
            return (
              new Date(b.start_time).getTime() -
              new Date(a.start_time).getTime()
            );
          });

          self.events = events;
        })
        .catch(e => {
          console.error(e);
          alert("Failed to fetch events");
        });
    }
  },
  mounted() {
    this.fetchEvents();
  }
};
</script>
