<template lang="pug">
  router-link(v-bind="{...$props, ...$attrs}").text-blue-400
    slot
</template>

<script>
export default {};
</script>
