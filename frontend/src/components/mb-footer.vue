<template>
  <footer class="gradient-blue-mint py-8 mt-32" style="height: 350px">
    <div
      class="bg-transparent m-auto h-full w-full justify-between p-4"
      style="background: rgba(255,255,255,0.25);"
    >
      <div
        class="bg-transparent px-12 m-auto h-full w-full flex flex-col justify-between"
      >
        <div class="font-bold">
          <img :src="mintbeanLogo" class="h-12" alt="Mintbean Logo" />
        </div>
        <div class="flex">
          <div
            v-for="(column, i) in columns"
            :key="i"
            class="p-2 mr-5 justify-between "
          >
            <mb-links
              :links="column.links"
              class="flex flex-col"
              link-class="pb-4"
            />
          </div>
        </div>
        <div>
          Made by Mintbean, Copyright 2020 All Rights Reserved. Some images
          designed by Freepik.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import mintbeanLogo from "../../src/assets/mintbean-logo.png";
export default {
  name: "mb-footer",
  data() {
    return {
      mintbeanLogo,
      columns: [
        {
          links: [
            {
              label: "Home",
              type: "internal",
              ref: "/"
            },
            {
              label: "Sign In",
              type: "internal",
              ref: "/auth/login"
            },
            {
              label: "Sign Up",
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
      }))
    };
  }
};
</script>
