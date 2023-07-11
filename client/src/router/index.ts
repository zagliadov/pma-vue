import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../store/modules/auth";
import { checkAuthentication } from "../helpers/helpers";

const LoginView = () => import("../views/LoginView.vue");
const ForgotPasswordView = () => import("../views/ForgotPasswordView.vue");
const CreateAccountView = () => import("../views/CreateAccountView.vue");
const ProjectsView = () => import("../views/ProjectsView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: async () => {
        return "login";
      },
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
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        console.log(isValid, "auth");
        if (!isValid) return "login";
        return isValid;
      },
    },
  ],
});

export default router;
