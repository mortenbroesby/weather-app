
import Vue from "vue";

import VueRouter, {
  RouterOptions,
  RouteConfig,
} from "vue-router";

Vue.use(VueRouter);

import Home from "./layouts/home";
import NotFound from "./layouts/notFound";

export enum RouteName {
  HOME = "home",
  NOT_FOUND = "not-found",
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: `/${RouteName.HOME}/`,
  },
  {
    path: `/${RouteName.HOME}/`,
    name: RouteName.HOME,
    component: Home,
  },
  {
    path: "*",
    name: RouteName.NOT_FOUND,
    component: NotFound,
  }
];

const routeOptions: RouterOptions = {
  routes,
  mode: "history",
  linkActiveClass: "active"
};

export const router = new VueRouter(routeOptions);
