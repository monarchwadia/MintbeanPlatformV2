<template lang="pug">
  footer.gradient-blue-mint.py-8.mt-32
    div.bg-transparent.m-auto.h-full.w-full.justify-between.p-4(style="background: rgba(255,255,255,0.25);")

      div.bg-transparent.px-12.m-auto.h-full.w-full.flex.flex-col.justify-between
        div.mb-4.font-bold.flex.justify-center.md_block
          img.h-12(:src="mintbeanLogo" alt="Mintbean Logo")

        div.text-center.md_text-left.flex.flex-col.md_flex-row
          div.p-2.mr-5.justify-between(v-for="(column, i) in columns" :key="i")
            mb-links.flex.flex-col(:links="column.links" link-class="pb-4")
        div.text-center.md_text-left
          | Made by Mintbean, Copyright 2020 All Rights Reserved. Some images
          | designed by Freepik.

</template>

<script>
import mintbeanLogo from "../../src/assets/mintbean-logo.png";
export default {
  name: "mb-footer",
  data() {
    return {
      mintbeanLogo
    };
  },
  computed: {
    user() {
      return this.$store.state && this.$store.state.user;
    },
    isLoggedIn() {
      return !!this.user;
    },
    columns() {
      return [
        {
          links: [
            {
              label: "Home",
              type: "internal",
              ref: "/"
            },
            {
              label: "Log Out",
              hidden: !this.isLoggedIn,
              type: "internal",
              ref: "/auth/logout"
            },
            {
              label: "Sign In",
              hidden: this.isLoggedIn,
              type: "internal",
              ref: "/auth/login"
            },
            {
              label: "Sign Up",
              hidden: this.isLoggedIn,
              type: "internal",
              ref: "/auth/register"
            }
          ]
        },
        {
          links: [
            {
              label: "Events",
              type: "external",
              ref: "https://www.eventbrite.ca/o/mintbean-28752300031"
            },
            {
              label: "Projects",
              hidden: true,
              type: "internal",
              ref: ""
            },
            {
              label: "Members",
              type: "internal",
              hidden: true,
              ref: ""
            }
          ]
        },
        {
          links: [
            {
              label: "Terms of Service",
              type: "internal",
              ref: "/legal/terms-of-service"
            },
            {
              label: "Privacy Policy",
              type: "internal",
              ref: "/legal/privacy-policy"
            }
          ]
        },
        {
          links: [
            {
              label: "LinkedIn",
              type: "external-follow",
              ref: "https://www.linkedin.com/company/30908119"
            },
            {
              label: "Twitter",
              type: "external-follow",
              ref: "https://twitter.com/Mintbeanio"
            },
            {
              label: "Facebook",
              type: "external-follow",
              ref: "https://www.facebook.com/Mintbean-104353817855570"
            }
          ]
        }
      ].map(({ links, ...rest }) => ({
        ...rest,
        links: links.filter(l => !l.hidden)
      }));
    }
  }
};
</script>
