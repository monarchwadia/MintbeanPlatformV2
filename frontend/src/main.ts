import Vue from "vue";
import Vuex, { Store } from "vuex";

const Cloudinary: any = require('cloudinary-vue');


import makeContext from "./config/makeContext";
import registerComponents from "./config/registerComponents";
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

import "./styles/app.scss";
import { MbState } from './types/MbState';

declare global {
  interface Window {
    store: Store<MbState>;
  }
}

Vue.use(Vuex);
Vue.use(Cloudinary);

registerComponents(Vue);

const context = makeContext();
Vue.prototype.$mbContext = context;

const store = createStore(context);
window.store = store;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
