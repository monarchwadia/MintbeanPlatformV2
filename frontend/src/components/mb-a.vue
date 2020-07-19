<template lang="pug">
  a(v-bind="{...$props, ...$attrs}" @click="$emit('click', $event)")
    slot
</template>

<script>
export default {
  name: "mb-a"
}
</script>
