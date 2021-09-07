import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({
            ...savedPosition,
            behavior: "smooth",
          });
        } else {
          resolve({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 50);
    });
  },
});

export function useRouter(): Router {
  return router as Router;
}
