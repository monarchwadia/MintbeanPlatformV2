<template>
  <label v-bind="{ ...$props, ...$attrs }" class="flex flex-col cursor-pointer">
    <slot />
  </label>
</template>

<script>
export default {
  name: "mb-label"
};
</script>
