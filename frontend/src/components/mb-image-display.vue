<template>
  <div class="mb-image-display flex justify-center">
    <cld-context cloudName="mintbean">
      <cld-image v-if="publicId" :publicId="publicId" secure="true">
        <cld-transformation
          :width="width"
          :height="height"
          background="black"
          :crop="crop"
        />
      </cld-image>
    </cld-context>
  </div>
</template>

<style>
/* .mb-image-display .cld-context .cld-image img {
  max-width: 100%;
} */
</style>

<script>
import {
  CldContext,
  CldImage,
  CldTransformation
  // CldVideo,
  // CldPoster
} from "cloudinary-vue";

export default {
  name: "mb-image-display",
  props: {
    publicId: String,
    height: String,
    width: String,
    crop: {
      type: String,
      default: "pad"
    }
  },
  components: {
    "cld-context": CldContext,
    "cld-image": CldImage,
    // "cld-video": CldVideo,
    "cld-transformation": CldTransformation
    // "cld-poster": CldPoster
  }
};
</script>
