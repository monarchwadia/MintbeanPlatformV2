<template lang="pug">
div.container.m-auto.text-center(style="height: 80vh; padding-top: 25vh")
    p.text-6xl {{ header }}
    p.text-2xl.max-w-xl.m-auto(class="italic") {{ body }}
</template>

<script>
export default {
  props: ['header', 'body']
};
</script>
