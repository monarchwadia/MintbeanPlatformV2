<template>
  <footer class="gradient-blue-mint py-8" style="height: 350px">
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
          <div v-for="(link, j) in column.links" :key="j">
            <div class="pb-4">{{ link.label }}</div>
          </div>
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
              url: "https://mintbean.io"
            },
            {
              label: "Login",
              url: ""
            },
            {
              label: "Register",
              url: ""
            }
          ]
        },
        {
          links: [
            {
              label: "Events",
              url: "https://mintbean.io"
            },
            {
              label: "Projects",
              url: ""
            },
            {
              label: "Members",
              url: ""
            }
          ]
        },
        {
          links: [
            {
              label: "Terms of Service",
              url: ""
            },
            {
              label: "Privacy Policy",
              url: ""
            }
          ]
        },
        {
          links: [
            {
              label: "LinkedIn",
              url: ""
            },
            {
              label: "Twitter",
              url: ""
            },
            {
              label: "Facebook",
              url: ""
            }
          ]
        }
      ]
    };
  }
};
</script>
