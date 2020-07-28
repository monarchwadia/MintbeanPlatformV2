import Vue from "vue";
import Vuex, { Store } from "vuex";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Cloudinary: any = require("cloudinary-vue");
const Intercom: any = require("vue-intercom");
/* eslint-enable @typescript-eslint/no-explicit-any */

import makeContext from "./config/makeContext";
import registerComponents from "./config/registerComponents";
import registerFontAwesome from "./config/registerFontAwesome";
import registerFormulate from "./config/registerFormulate";

import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

import "./styles/app.pcss";
import { MbState } from "./types/MbState";
import VueGtag from "vue-gtag";

declare global {
  interface Window {
    store: Store<MbState>;
  }
}

Vue.use(Vuex);
Vue.use(Cloudinary);
Vue.use(Intercom, { appId: "cnqttk95" });
if (process.env.NODE_ENV === "production") {
  console.log("Loading google analytics");
  Vue.use(VueGtag, {
    config: { id: "UA-159327705-1" }
  });
}

registerComponents(Vue);
registerFontAwesome(Vue);
registerFormulate(Vue);

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
