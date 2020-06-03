<template>
<cld-context cloudName="mintbean">
  <cld-image :publicId="publicId" secure="true">
    <cld-transformation width="150" height="150" gravity="face" crop="thumb" />
    <cld-transformation radius="20" />
    <cld-transformation effect="sepia" />
    <cld-transformation overlay="cloudinary_icon" gravity="south_east" x="5" y="5" width="50" opacity="60" effect="brightness:200" />
    <cld-transformation angle="10" />
  </cld-image>
</cld-context>

</template>
 
<script>
import {CldContext, CldImage, CldVideo, CldTransformation, CldPoster} from 'cloudinary-vue';

export default {
    name: 'mb-file-upload',
    props: ['publicId'],
    components: {
      "cld-context": CldContext,
      "cld-image": CldImage,
      // "cld-video": CldVideo,
      "cld-transformation": CldTransformation,
      // "cld-poster": CldPoster
    }
};
</script>
