import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import CreateAccountView from "../views/CreateAccountView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // Добавляем мета-свойство для указания требуется ли аутентификация
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/forgot_password",
      name: "forgot_password",
      component: ForgotPasswordView,
    },
    {
      path: "/create_account",
      name: "create_account",
      component: CreateAccountView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Проверьте здесь, установлено ли значение аутентификации

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если требуется аутентификация и пользователь не аутентифицирован, перенаправляем на страницу входа
    next({ name: "login" });
  } else {
    next(); // Продолжаем нормальную навигацию
  }
});

export default router;
