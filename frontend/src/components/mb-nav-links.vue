<template>
  <nav>
    <mb-links
      :links="links"
      :class="classes"
      link-class="inline-block text-black font-semibold rounded hover_bg-teal-400 hover_text-white py-4 px-5"
    />
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
