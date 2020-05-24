import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/GaHome/GaHome.vue";
import Login from "../views/Auth/Login.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
