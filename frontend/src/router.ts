import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import MbEvent from "./views/MbEvent.vue";
import MbEvents from "./views/MbEvents.vue";
import Login from "./views/Auth/Login.vue";
import Logout from "./views/Auth/Logout.vue";
import Register from "./views/Auth/Register.vue";
import Reset from "./views/Auth/Reset.vue";
import ResetNewPassword from "./views/Auth/ResetNewPassword.vue";
import Project from "./views/Project.vue";
import UserProfile from "./views/UserProfile.vue";
import Admin from "./views/Admin/Admin.vue";
import TermsOfService from "./views/Legal/TermsOfService.vue";
import PrivacyPolicy from "./views/Legal/PrivacyPolicy.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(VueRouter);

// TODO: type to and from
/* eslint-disable @typescript-eslint/no-explicit-any */
const ifAdmin = (to: any, from: any, next: (route?: string) => void) => {
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (window.store.state.user && window.store.state.user.isAdmin) {
    next();
    return;
  }
  next("/auth/login");
};

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
    path: "/auth/reset",
    name: "Reset",
    component: Reset
  },
  {
    path: "/auth/reset/:token",
    name: "ResetNewPassword",
    component: ResetNewPassword
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
    path: "/auth/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/mb-event/:id",
    name: "Event",
    component: MbEvent
  },
  {
    path: "/mb-events",
    name: "Events",
    component: MbEvents
  },
  {
    path: "/user-profile/:id",
    name: "User Profile",
    component: UserProfile
  },
  {
    path: "/admin",
    name: "Admin Panel",
    component: Admin,
    beforeEnter: ifAdmin
  },
  {
    path: "/legal/terms-of-service",
    name: "Terms Of Service",
    component: TermsOfService
  },
  {
    path: "/legal/privacy-policy",
    name: "Privacy Policy",
    component: PrivacyPolicy
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
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
