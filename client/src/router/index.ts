import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import CreateAccountView from "../views/CreateAccountView.vue";
import NoProjects from "../views/NoProjects.vue";
import CreateProject from "../views/CreateProject.vue";
import ProjectTable from "../views/ProjectTable.vue";
import TimelineTable from "../views/TimelineTable.vue";
import MySettings from "../views/MySettings.vue";
import Notification from "../views/Notification.vue";
import Projects from "../views/Projects.vue";
import MySettingsEditProject from "../views/MySettingsEditProject.vue";
import Information from "../views/Information.vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import {
  authMiddleware,
  checkProjectCreatorMiddleware,
  editProjectMiddleware,
  homeMiddleware,
  loginMiddleware,
  projectAssigneesMiddleware,
  projectViewMiddleware,
  projectsDataMiddleware,
} from "./middleware/middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: homeMiddleware,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: loginMiddleware,
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
      name: "no_projects",
      meta: { requiresAuth: true },
      component: NoProjects,
      beforeEnter: authMiddleware,
    },
    {
      path: "/:email/workspace/:workspace_id/create_project",
      name: "create_project",
      meta: { requiresAuth: true },
      component: CreateProject,
      beforeEnter: authMiddleware,
    },
    {
      path: "/:email/workspace/:workspace_id/project/:project_id",
      name: "project_view",
      meta: { requiresAuth: true },
      component: ProjectTable,
      beforeEnter: [
        authMiddleware,
        checkProjectCreatorMiddleware,
        projectAssigneesMiddleware,
        projectViewMiddleware,
      ],
    },
    {
      path: "/:email/workspace/:workspace_id/project/:project_id/timeline",
      name: "project_timeline_view",
      meta: { requiresAuth: true },
      component: TimelineTable,
      beforeEnter: [authMiddleware, projectViewMiddleware],
    },
    {
      path: "/my_settings/:email",
      name: "my_settings",
      meta: { requiresAuth: true },
      component: MySettings,
      beforeEnter: authMiddleware,
    },
    {
      path: "/my_settings/:email/notification",
      name: "notification",
      meta: { requiresAuth: true },
      component: Notification,
      beforeEnter: authMiddleware,
    },
    {
      path: "/my_settings/:email/projects",
      name: "projects",
      meta: { requiresAuth: true },
      component: Projects,
      beforeEnter: async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        await authMiddleware(to, from, next);
        await projectsDataMiddleware(to, from, next);
      },
    },
    {
      path: "/my_settings/:email/projects/edit_project/:id",
      name: "my_settings_edit_project",
      meta: { requiresAuth: true },
      component: MySettingsEditProject,
      beforeEnter: async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        await editProjectMiddleware(to, from, next);
        await authMiddleware(to, from, next);
      },
    },
    {
      path: "/my_settings/:email/information",
      name: "information",
      meta: { requiresAuth: true },
      component: Information,
      beforeEnter: authMiddleware,
    },
  ],
});

export default router;
