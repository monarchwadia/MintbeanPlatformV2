const VueCountdown: any = require('@chenfengyuan/vue-countdown');
import mbA from "../components/mb-a.vue";
import mbNav from "../components/mb-nav.vue";
import mbFileUpload from "../components/mb-file-upload.vue";
import mbImageDisplay from "../components/mb-image-display.vue";
import mbProjectGrid from "../components/mb-project-grid.vue";
import { VueConstructor } from 'vue';

export default (Vue: VueConstructor<Vue>) => {
  Vue.component("mb-a", mbA);
  Vue.component("mb-nav", mbNav);
  Vue.component("mb-file-upload", mbFileUpload);
  Vue.component("mb-image-display", mbImageDisplay);
  Vue.component("mb-project-grid", mbProjectGrid);
  Vue.component(VueCountdown.name, VueCountdown);
}

