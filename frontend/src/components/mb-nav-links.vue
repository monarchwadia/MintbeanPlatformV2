<template>
  <nav :class="classes">
    <div v-for="(link, i) in links" :key="i" class="p-3 m-0">
      <a v-if="link.onClick" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800" href="#" v-on:click.prevent="link.onClick">
        {{ link.label }}
      </a>
      <router-link v-else :to="link.linkTo" class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-800">
        {{ link.label }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    links: Array,
    forResponsive: Boolean
  },
  computed: {
    classes() {
      const common = "px-2 pt-2 pb-4 sm_p-0";

      return this.$props.forResponsive
        ? `md_hidden flex ${common}`
        : `hidden md_flex ${common}`;
    }
  }
};
</script>
