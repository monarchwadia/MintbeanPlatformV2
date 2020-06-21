<template lang="pug">
    div.container.m-auto(v-html="markdown")
</template>
<script>
import markdown from "raw-loader!markdown-loader!./PrivacyPolicy.md";

export default {
  data() {
    return {
      markdown
    }
  }
};
</script>
