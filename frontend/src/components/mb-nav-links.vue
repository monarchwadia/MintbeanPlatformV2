<template>
  <nav :class="classes">
    <div v-for="(link, i) in links" :key="i">
      <a
        v-if="link.onClick"
        class="inline-block text-black font-semibold rounded hover_bg-teal-400 hover_text-white py-4 px-5"
        href="#"
        v-on:click.prevent="link.onClick"
      >
        {{ link.label }}
      </a>
      <router-link
        v-else
        :to="link.linkTo"
        class="inline-block text-black font-semibold rounded hover_bg-teal-400 hover_text-white py-4 px-5"
      >
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
