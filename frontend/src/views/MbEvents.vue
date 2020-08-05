<template lang="pug">
  div
    mb-banner(
      title="Events"
      backRefTitle="Home",
      backRefPath="/"
    )
    div.container.m-auto.pt-24
      div.mb-4.md_mb-0.md_mr-4.shadow-mb.p-10.flex.flex-col.justify-center.text-white.rounded-lg(style="flex-basis: 60%; background: linear-gradient(0deg, black, #3d3d3d);")
        h2.mb-2.text-2xl.md_text-4xl Upcoming Events
        mb-event-section(v-if="futureEvents.length > 0" :events="futureEvents")
        p.text-2xl.mb-6(v-else) No events at the moment... Stay tuned!
      div.p-10.mt-6(v-if="pastEvents.length > 0")
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
          console.log(events[1]);
          self.pastEvents = events
            .filter(e => isPast(e.end_time))
            .sort((a, b) => {
              // to reverse chronological
              return (
                new Date(b.start_time).getTime() -
                new Date(a.start_time).getTime()
              );
            });
          self.futureEvents = events
            .filter(e => isUpcoming(e.end_time))
            // to chronological
            .sort((a, b) => {
              // to reverse chronological
              return (
                new Date(a.start_time).getTime() -
                new Date(b.start_time).getTime()
              );
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
