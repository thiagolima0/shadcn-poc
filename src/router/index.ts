import { createRouter, createWebHistory } from "vue-router";

import IndexPage from "@/pages/IndexPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

const routes = [
  { path: "/", name: "Index", component: IndexPage },
  { path: "/dashboard", name: "Dashboard", component: DashboardPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _) => {
  const auth = useAuthStore();
  if (!auth.isAuthenticated && to.name !== "Login") {
    return { name: "Login" };
  } else if (auth.isAuthenticated && to.name === "Login") {
    return { path: "/" };
  }
});
