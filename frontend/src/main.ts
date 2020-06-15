import Vue from "vue";
import Vuex, { Store } from "vuex";

const Cloudinary: any = require("cloudinary-vue");
const Intercom: any = require("vue-intercom");

import makeContext from "./config/makeContext";
import registerComponents from "./config/registerComponents";
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

import "./styles/app.scss";
import { MbState } from "./types/MbState";
import registerFontAwesome from "./config/registerFontAwesome";

declare global {
  interface Window {
    store: Store<MbState>;
  }
}

Vue.use(Vuex);
Vue.use(Cloudinary);
Vue.use(Intercom, { appId: "cnqttk95" });

registerComponents(Vue);
registerFontAwesome(Vue);

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
