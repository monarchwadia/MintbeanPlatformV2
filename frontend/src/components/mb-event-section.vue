<template lang="pug">
  div.w-full
    div.mb-2
      h1.text-4xl {{ title }}
    div.flex.flex-wrap(style="margin: -0.5rem;")
      mb-event-card(
        style="width: calc(50% - 1rem)"
        v-for="event in events"
        :key="event.id"
        :id="event.id"
        :cloudinaryPublicId="event.MediaAssets[0].cloudinaryPublicId"
        :eventTitle="event.title"
        :startTime="event.startTime"
        :registerLink="event.registerLink"
      )
</template>

<script>
export default {
  name: "mb-event-section",
  props: {
    title: String,
    events: {
      type: Array,
      // TODO: remove this dummy data once hooked up to real events (MbConfig)
      default: () => [
        {
          id: "fjhsdkhfsd-3284-fdsaf-343",
          MediaAssets: [
            { cloudinaryPublicId: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F104989166%2F426627906897%2F1%2Foriginal.20200630-224301?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C150%2C2880%2C1440&s=c5bdf44134c893cc7dbb631b73973ba7" }
          ],
          title: "Hackernoon",
          startTime: new Date(new Date().getTime()+1000*60*60*24*2),
          registerLink: "https://www.eventbrite.ca/e/mintbean-hackathons-hackernoon-tickets-111883699156"
        },
        {
          id: "trfresd-3284-fdsaf-3d43",
          MediaAssets: [
            { cloudinaryPublicId: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F104988470%2F426627906897%2F1%2Foriginal.20200630-223416?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C57%2C2880%2C1440&s=c68441f6485bd652cc18b748b2dbff11" }
          ],
          title: "Music Hack",
          startTime: new Date(new Date().getTime()+1000*60*60*24*3),
          registerLink: "https://www.eventbrite.ca/e/mintbean-hackathons-music-hack-tickets-111881326058"
        },
      ],
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.user && this.$store.state.user.isAdmin;
    },
  },
}
</script>
