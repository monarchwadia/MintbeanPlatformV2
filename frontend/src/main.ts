import Vue from "vue";
import Vuex, { Store } from "vuex";
const VueCountdown: any = require('@chenfengyuan/vue-countdown');
const Cloudinary: any = require('cloudinary-vue');


import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

import mbA from "./components/mb-a.vue";
import mbNav from "./components/mb-nav.vue";
import mbFileUpload from "./components/mb-file-upload.vue";
import mbImageDisplay from "./components/mb-image-display.vue";

import "./styles/app.scss";
import { AuthService } from './services/authService';
import { MbState } from './types/MbState';
import { ApiService } from './services/apiService';
import { MbContext } from './types/MbContext';
import { MbEventService } from './services/mbEventService';
import { ProjectService } from './services/projectService';
import { UserProfileService } from './services/userProfileService';

Vue.use(Vuex);
Vue.use(Cloudinary);

declare global {
  interface Window {
    store: Store<MbState>;
  }
}

// create the store
const apiService = new ApiService();

const mbContext: MbContext = {
  apiService,
  authService: new AuthService(apiService),
  mbEventService: new MbEventService(apiService),
  projectService: new ProjectService(apiService),
  userProfileService: new UserProfileService(apiService)
}

Vue.prototype.$mbContext = mbContext;

const store = createStore(mbContext);

window.store = store;

Vue.config.productionTip = false;

Vue.component("mb-a", mbA);
Vue.component("mb-nav", mbNav);
Vue.component("mb-file-upload", mbFileUpload);
Vue.component("mb-image-display", mbImageDisplay);
Vue.component(VueCountdown.name, VueCountdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
