import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import layoutDefault from "../layouts/default.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/",
    component: layoutDefault,
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("../pages/index.vue"),
      },
    ],
  },
  //  single post page
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../pages/post.vue"),
  },
  // create post page
  {
    path: "/create",  
    name: "create",
    component: () => import("../pages/create.vue"),
  },

  {
    path: "/404",
    component: () => import("../layouts/error.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
