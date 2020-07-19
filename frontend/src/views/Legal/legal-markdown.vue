<template lang="pug">
    div.legal-markdown.container.m-auto(v-html="markdown")
</template>
<script>
export default {
  props: ["markdown"]
};
</script>

<style lang="postcss">
.legal-markdown {
  padding-top: 4rem;
  padding-bottom: 4rem;

  * {
    padding-bottom: 0.5rem;
  }
  ol {
    list-style-type: upper-roman;
    padding-bottom: 0.5rem;

    ol {
      list-style-type: disc;
    }

    ul {
      list-style-type: disc;
    }
  }

  li {
    margin-left: 2rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    padding-top: 2rem;
  }

  h1 {
    font-size: 1.6em;
  }

  h2 {
    font-size: 1.4em;
  }

  h3 {
    font-size: 1.3em;
  }

  h4 {
    font-size: 1.2em;
  }

  h5 {
    font-size: 1.1em;
  }

  h6 {
    font-size: 1em;
  }

  a {
    color: blue;
  }
}
</style>
