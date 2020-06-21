<template>
  <button v-bind="{...$props, ...$attrs}" class="gradient-blue-mint text-white p-2 hover_shadow-md">
    <slot />
  </button>
</template>

<script>
export default {
  
}
</script>