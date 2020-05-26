import Vue from "vue";
import Vuex, { Store } from "vuex";
const VueCountdown: any = require('@chenfengyuan/vue-countdown');

import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

import mbA from "./components/mb-a.vue";
import mbNav from "./components/mb-nav.vue";

import "./styles/app.scss";
import { AuthService } from './services/authService';
import { MbState } from './types/MbState';
import { ApiService } from './services/apiService';
import { MbContext } from './types/MbContext';
import { MbEventService } from './services/mbEventService';
import { ProjectService } from './services/projectService';

Vue.use(Vuex);

declare global {
  interface Window {
    store: Store<MbState>;
  }
}

// create the store
const apiService = new ApiService();
const authService = new AuthService(apiService);
const mbEventService = new MbEventService(apiService);
const projectService = new ProjectService(apiService);
const context: MbContext = { apiService, authService, mbEventService, projectService }
const store = createStore(context);

window.store = store;

Vue.config.productionTip = false;

Vue.component("mb-a", mbA);
Vue.component("mb-nav", mbNav);
Vue.component(VueCountdown.name, VueCountdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
