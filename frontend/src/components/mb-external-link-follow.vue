<template lang="pug">
  mb-a(v-bind="{...$props, ...$attrs}" rel="noopener noreferrer" target="_blank")
    slot
</template>

<script>
export default {
  name: "mb-external-link-follow"
};
</script>
