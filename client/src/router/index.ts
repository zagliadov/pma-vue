import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import CreateAccountView from "../views/CreateAccountView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import axios from "axios";
import { API_URL } from "../helpers/constants";
import { checkAuthentication } from "../helpers/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: () => {
        return "/login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: async () => {
        localStorage.removeItem("token");
      },
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
    {
      path: "/:email/workspace/:workspace_id",
      name: "project_view",
      component: ProjectsView,
      beforeEnter: async () => {
        const auth = await checkAuthentication();
        return auth;
      },
    },
  ],
});

export default router;
