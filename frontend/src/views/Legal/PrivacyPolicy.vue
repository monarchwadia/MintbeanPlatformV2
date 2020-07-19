<template lang="pug">
    div.container.m-auto
      legal-markdown(:markdown="markdown")
</template>
<script>
import markdown from "raw-loader!markdown-loader!./PrivacyPolicy.md";
import legalMarkdown from "./legal-markdown.vue";

export default {
  data() {
    return {
      markdown
    };
  },
  components: {
    "legal-markdown": legalMarkdown
  }
};
</script>
