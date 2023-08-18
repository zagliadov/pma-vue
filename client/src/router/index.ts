import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../store/modules/auth";
import { useProjectStore } from "../store/modules/project";
import { useAssigneeStore } from "@/store/modules/assignee";

const LoginView = () => import("../views/LoginView.vue");
const ForgotPasswordView = () => import("../views/ForgotPasswordView.vue");
const CreateAccountView = () => import("../views/CreateAccountView.vue");
const NoProjects = () => import("../views/NoProjects.vue");
const CreateProject = () => import("../views/CreateProject.vue");
const ProjectTable = () => import("../views/ProjectTable.vue");
const TimelineTable = () => import("../views/TimelineTable.vue");
const MySettings = () => import("../views/MySettings.vue");
const Notification = () => import("../views/Notification.vue");
const Projects = () => import("../views/Projects.vue");
const MySettingsEditProject = () => import("../views/MySettingsEditProject.vue");
const Information = () => import("../views/Information.vue");

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
        localStorage.removeItem("color");
        localStorage.removeItem("color_id");
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
      name: "no_projects",
      component: NoProjects,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/:email/workspace/:workspace_id/create_project",
      name: "create_project",
      component: CreateProject,
    },
    {
      path: "/:email/workspace/:workspace_id/project/:project_id",
      name: "project_view",
      component: ProjectTable,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/:email/workspace/:workspace_id/project/:project_id/timeline",
      name: "project_timeline_view",
      component: TimelineTable,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/my_settings/:email",
      name: "my_settings",
      component: MySettings,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/my_settings/:email/notification",
      name: "notification",
      component: Notification,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/my_settings/:email/projects",
      name: "projects",
      component: Projects,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const projectStore = useProjectStore();
        const assigneeStore = useAssigneeStore();
        const { checkAuthentication } = auth;
        const { getTotalProjectCount, getAllProjects } = projectStore;
        const { getAssigneeProjects } = assigneeStore;
        getTotalProjectCount();
        getAllProjects();
        getAssigneeProjects();
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
    {
      path: "/my_settings/:email/projects/edit_project/:id",
      name: "my_settings_edit_project",
      component: MySettingsEditProject,
      beforeEnter: async (to) => {
        const id = Number(to.params.id);
        const projectStore = useProjectStore();
        const assigneeStore = useAssigneeStore();
        const { getProject } = projectStore;
        const { getAllAssignee } = assigneeStore;
        await getAllAssignee();
        await getProject(id);
      },
    },
    {
      path: "/my_settings/:email/information",
      name: "information",
      component: Information,
      beforeEnter: async () => {
        const auth = useAuthStore();
        const { checkAuthentication } = auth;
        const isValid = await checkAuthentication();
        if (!isValid) return "login";
        return isValid;
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "project_view" || to.name === "project_timeline_view") {
    // Assuming you have a function getProject that fetches project data based on projectId
    const projectId: number = Number(to.params.project_id);
    try {
      const projectStore = useProjectStore();
      const { getProject } = projectStore;
      await getProject(projectId);
      next();
    } catch (error) {
      console.error("Error fetching project data:", error);
      next({ name: "login" });
    }
  } else {
    next();
  }
});


export default router;
