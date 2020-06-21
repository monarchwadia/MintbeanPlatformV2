const VueCountdown: any = require("@chenfengyuan/vue-countdown");
import mbA from "../components/mb-a.vue";
import mbExternalLink from "../components/mb-external-link.vue";
import mbExternalLinkFollow from "../components/mb-external-link-follow.vue";
import mbNav from "../components/mb-nav.vue";
import mbFileUpload from "../components/mb-file-upload.vue";
import mbImageDisplay from "../components/mb-image-display.vue";
import mbProjectGrid from "../components/mb-project-grid.vue";
import mbProjectSearch from "../components/mb-project-search.vue";
import mbModal from "../components/mb-modal.vue";
import mbFooter from "../components/mb-footer.vue";
import mbButton from "../components/mb-button.vue";
import mbInput from "../components/mb-input.vue";
import mbLabel from "../components/mb-label.vue";
import mbLinks from "../components/mb-links.vue";

import { VueConstructor } from "vue";

export default (Vue: VueConstructor<Vue>) => {
  Vue.component("mb-a", mbA);
  Vue.component("mb-external-link", mbExternalLink);
  Vue.component("mb-external-link-follow", mbExternalLinkFollow);
  Vue.component("mb-nav", mbNav);
  Vue.component("mb-file-upload", mbFileUpload);
  Vue.component("mb-image-display", mbImageDisplay);
  Vue.component("mb-project-grid", mbProjectGrid);
  Vue.component("mb-project-search", mbProjectSearch);
  Vue.component("mb-modal", mbModal);
  Vue.component("mb-footer", mbFooter);
  Vue.component("mb-button", mbButton);
  Vue.component("mb-input", mbInput);
  Vue.component("mb-label", mbLabel);
  Vue.component("mb-links", mbLinks);
  Vue.component(VueCountdown.name, VueCountdown);
};
