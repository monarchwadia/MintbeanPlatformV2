<template lang="pug">
  a(v-bind="{...$props, ...$attrs}")
    slot
</template>

<script>
export default {
  name: "mb-a"
}
</script>
