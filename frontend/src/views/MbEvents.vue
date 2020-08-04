<template lang="pug">
  div
    mb-banner(
      title="Events"
      backRefTitle="Home",
      backRefPath="/"
    )
    div.container.m-auto.pt-24
      div
        h2.mb-2.text-2xl.md_text-4xl Upcoming Events
        mb-event-section(:events="futureEvents")
      div.mt-6
        h2.mb-2.text-2xl.md_text-4xl Past Events
        mb-event-section(:events="pastEvents")
</template>

<script>
// @ is an alias to /src
import isPast from "../helpers/isPast";
import isUpcoming from "../helpers/isUpcoming";

export default {
  name: "Events",
  data() {
    return {
      pastEvents: [],
      futureEvents: []
    };
  },
  methods: {
    fetchEvents() {
      const self = this;

      this.$mbContext.mbEventService
        .getMbEvents()
        .then(events => {
          events = events.sort((a, b) => {
            // to reverse chronological
            return (
              new Date(b.start_time).getTime() -
              new Date(a.start_time).getTime()
            );
          });

          self.pastEvents = events.filter(e => isPast(e.end_time));
          self.futureEvents = events
            .filter(e => isUpcoming(e.end_time))
            // to chronological order
            .sort((b, a) => {
              return a.end_time > b.end_time
                ? 1
                : a.end_time < b.end_time
                ? -1
                : 0;
            });
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
