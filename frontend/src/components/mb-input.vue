<template>
  <input
    v-bind="{ ...$props, ...$attrs }"
    class="border-gray-300 border-2 rounded-sm mb-4 p-2 cursor-pointer"
    v-bind:value="value"
    v-on:input="emitValue"
  />
</template>

<script>
export default {
  props: ["value"],
  name: "mb-input",
  methods: {
    emitValue(evt) {
      this.$emit("update:value", evt.target.value);
    }
  }
};
</script>
