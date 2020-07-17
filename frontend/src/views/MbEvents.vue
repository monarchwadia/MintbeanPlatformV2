<template lang="pug">
  div
    mb-banner(title="Events")
    div.container.m-auto.pt-24
      mb-back-button
      mb-event-section(:events="events")
</template>


<script>
import moment from "moment";

// @ is an alias to /src
export default {
  name: "Events",
  data() {
    return {
      pastEvents: [],
      upcomingEvents: [],
      events: [],
    }
  },
  methods: {
    fetchEvents() {
      const self = this;
      const nowUTC = moment(new Date);

      this.$mbContext.mbEventService
        .getMbEvents()
        .then(events => {
          // TODO: remove this in prod
          events = events.map(e => {
            return {
              ...e,
              MediaAssets: [
                {cloudinaryPublicId: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F104989166%2F426627906897%2F1%2Foriginal.20200630-224301?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C150%2C2880%2C1440&s=c5bdf44134c893cc7dbb631b73973ba7"},
              ],
            }
          })
          self.events = events;
        })
        .catch(e => {
          console.error(e);
          alert("Failed to fetch events");
        });
    },
  },
  mounted() {
    this.fetchEvents()
  }
};
</script>
