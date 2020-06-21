<template>
  <footer class="gradient-blue-mint p-8" style="height: 400px">
    <div class="bg-transparent container m-auto h-full w-full flex flex-col justify-between p-8 pl-32" style="background: rgba(255,255,255,0.4);">
    <div class="font-bold">
      <img :src="mintbeanLogo" class="h-12" alt="Mintbean Logo" />
    </div>
      <div class="flex">
        <div v-for="(column, i) in columns" :key="i" class="pr-20 justify-between">
          <div v-for="(link, j) in column.links" :key="j">
            <div class="pb-4">{{ link.label }}</div>
          </div>
        </div>
      </div>
      <div>
        Made by Mintbean, Copyright 2020 All Rights Reserved. Some images designed by Freepik.
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
              label: 'Home',
              url: 'https://mintbean.io'
            },
            {
              label: 'Login',
              url: ''
            },
            {
              label: 'Register',
              url: ''
            }
          ]
        },
        {
          links: [
            {
              label: 'Events',
              url: 'https://mintbean.io'
            },
            {
              label: 'Projects',
              url: ''
            },
            {
              label: 'Members',
              url: ''
            }
          ]
        },
        {
          links: [
            {
              label: 'Terms of Service',
              url: ''
            },
            {
              label: 'Privacy Policy',
              url: ''
            }
          ]
        },
        {
          links: [
            {
              label: 'LinkedIn',
              url: ''
            },
            {
              label: 'Twitter',
              url: ''
            },
            {
              label: 'Facebook',
              url: ''
            }
          ]
        },
      ]
    }
  }
};
</script>
