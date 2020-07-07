<template lang="html">
  <div>
    <mb-modal :show="show" @close="close">
      <template v-slot:title>
        Edit section
      </template>
      <template v-slot:body>
        <div class="p-2">
          <input
            type="text"
            placeholder="Section title"
            class="p-2"
            v-model="titleData"
            @keyup="$emit('update',titleData);"
          />
        </div>
      </template>
    </mb-modal>
  </div>
</template>

<script>
export default {
  name: 'mb-project-section-modal-edit',
  props: {
    show: Function,
    titleData: String,
  },
  data() {
    return {
      titleData: this.titleData,
    }
  },
  methods: {
    close: function() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="css" scoped >

</style>
