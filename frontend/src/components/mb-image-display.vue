<template>
<div class="mb-image-display">
  <cld-context cloudName="mintbean">
    <cld-image :publicId="publicId" secure="true">
      <cld-transformation :width="width" :height="height" crop="crop" />
    </cld-image>
  </cld-context>
</div>

</template>

<style>
  .mb-image-display .cld-context .cld-image img {
    max-width: 100%;
  }
</style>
 
<script>
import {CldContext, CldImage, CldVideo, CldTransformation, CldPoster} from 'cloudinary-vue';

export default {
    name: 'mb-file-upload',
    props: {
      publicId: String,
      height: String,
      width: String
    },
    components: {
      "cld-context": CldContext,
      "cld-image": CldImage,
      // "cld-video": CldVideo,
      "cld-transformation": CldTransformation,
      // "cld-poster": CldPoster
    }
};
</script>
