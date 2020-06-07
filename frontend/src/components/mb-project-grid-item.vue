<template lang="pug">
div.mb-project-grid-item
  div.inner
    div.overlay
    mb-image-display(:publicId="imagePublicId" height="500" width="350")
</template>

<style lang="scss" scoped>
.mb-project-grid-item {
  .inner {
    box-shadow: 6px 12px 25px var(--color-border);
    border-radius: 15px;
    overflow: hidden;
    width: 400px;
    height: 300px;
    position: relative;

    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      transition: opacity 0.5s;
      cursor: pointer;
      background: linear-gradient(180deg, rgba(237,2,2,0) 0%, rgba(0,0,0,0.8) 100%);
      opacity: 0;

      &:hover {
        // background-color: rgba(255,255,255,0.5);
        opacity: 0.6;
      }
    }
  }
}


</style>

<script>
export default {
  name: "MbProjectGridItem",
  props: ['imagePublicId']
};
</script>
