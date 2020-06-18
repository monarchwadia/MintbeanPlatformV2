<template lang="pug">
div
  //- mb-modal(:display="showSearchProjectsModal" v-on:close="closeSearchProjectsModal()")
  //-   mb-project-search
  header.py-10(style="background: linear-gradient(0deg,#a3fedf,#fff 50%)")
    div.container.flex.justify-between.m-auto.pb-10
      div.flex-initial.px-15.py-20
        p.text-6xl.font-semibold Write code.
        p.text-6xl.font-semibold Get noticed.
        p.text-6xl.font-semibold Get hired.
        p.text-l.pt-5 Come for the jobs. Stay for the community.
      div.flex-initial.px-15.py-20.flex-col
        div.flex
          div.p-3.sm_block.hidden
            mb-image-display(serverId="c58b49717bb0118438ee4a47e4ed2038")
            img.signup-bean(src='../assets/bean.png')
          div.p-3
            p.text-2xl.lg_text-3xl.xl_text-5xl Let the fun begin!
            div.text-xl.md_text-xl.xl_text-2xl.mt-5
              p Frontend & Full Stack Hackathons
              p Every Monday & Wednesday
              p 12:00pm EST
        div.p-3
          mb-a(href="https://www.eventbrite.ca/o/mintbean-28752300031")
            button.u-pulse.text-white.p-6.min-w-full.gradient-blue-mint Sign up now!
  
  main
    h2 Featured Projects
    mb-project-search(show-search-panel=false)

    h2 Past events.
    section.u-centered
      aside(v-for="mbEvent in mbEvents" class="hackathon-card" v-on:click.prevent="() => goToEvent(mbEvent.id)")
        img(:src="mbEvent.cover_image_url" max-height=300 width="100%")
        h3 {{mbEvent.title}}
        //- b(v-if="getEventStatus(mbEvent) === 'upcoming'")
        //-   countdown(:time="getCountdownTime(mbEvent.start_time)")
        //-     template(slot-scope="props") Starts In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        //- b(v-if="getEventStatus(mbEvent) === 'ongoing'")
        //-   countdown(:time="getCountdownTime(mbEvent.end_time)")
        //-     template(slot-scope="props") Ends In: <br/>{{ props.days }}d {{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s.
        //- b(v-if="getEventStatus(mbEvent) === 'ended'")
        //-   | Event Ended
        p {{mbEvent.description}}
</template>

<style lang="scss" scoped>
@import "../styles/utils";
</style>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      projects: [],
      showSearchProjectsModal: false
    };
  },
  computed: {
    mbEvents: function() {
      return this.$store.state.mbEvents || [];
    },
    nextEvent: function() {
      return this.$store.state.mbEvents.find(
        mbEvent => this.getEventStatus(mbEvent) === "upcoming"
      );
    }
  },
  methods: {
    openSearchProjectsModal() {
      this.showSearchProjectsModal = true;
    },
    closeSearchProjectsModal() {
      this.showSearchProjectsModal = false;
    },
    getEventStatus(mbEvent) {
      const timeToStart = new Date(mbEvent.start_time) - new Date();
      const timeToEnd = new Date(mbEvent.end_time) - new Date();

      if (timeToStart > 0) {
        return "upcoming";
      } else {
        if (timeToEnd > 0) {
          return "ongoing";
        } else {
          return "ended";
        }
      }
    },
    getCountdownTime: function(mbEventStartTime) {
      return new Date(mbEventStartTime) - new Date();
    },
    goToEvent: function(id) {
      if (id) {
        this.$router.push("/mb-event/" + id);
      }
    }
  },
  mounted() {
    const self = this;
    this.$mbContext.projectService
      .search()
      .then(results => {
        self.projects = results;
      })
      .catch(e => {
        console.error("Failed to fetch frontpage projects", e);
      });
  }
};
</script>
