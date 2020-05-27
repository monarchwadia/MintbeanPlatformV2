import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/GaHome/GaHome.vue";
import MbEvent from "../views/MbEvent.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Project from "../views/Project.vue";
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
    path: "/project/:id",
    name: "Project",
    component: Project
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register
  },
  {
    path: "/mb-event/:id",
    name: "Event",
    component: MbEvent
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
