<template lang="html">
  <div>
    <mb-modal :show="show" @close="close">
      <template v-slot:title>
        Edit section
      </template>
      <template v-slot:body>
        <input
          type="text"
          id="edit-title"
          placeholder="Section title"
          class="p-2"
          value="John"
        />
      </template>
    </mb-modal>
  </div>
</template>

<script>
export default {
  name: 'mb-project-section-modal-edit',
  props: ['show'],
  methods: {
    close: function() {
        this.$emit('close')
    }
  }
}
</script>

<style lang="css" scoped >

</style>
