import { useAssigneeStore } from "@/store/modules/assignee";
import { useAuthStore } from "@/store/modules/auth";
import { useProjectStore } from "@/store/modules/project";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { watch } from "vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

// Middleware function for the home route.
export const homeMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  next("login");
};

// Middleware function for the login route.

export const loginMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  localStorage.removeItem("token");
  localStorage.removeItem("color");
  localStorage.removeItem("color_id");
  next();
};

// Middleware function for routes requiring authentication.

export const authMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore();
    const { checkAuthentication } = auth;
    const isValid = await checkAuthentication();
    if (!isValid) {
      next({ name: "login" });
    } else {
      next();
    }
  }
};
// Middleware function for fetching project data.
export const projectsDataMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const projectStore = useProjectStore();
  const assigneeStore = useAssigneeStore();
  const { getTotalProjectCount, getAllProjects } = projectStore;
  const { getAssigneeProjects } = assigneeStore;

  try {
    await getTotalProjectCount();
    await getAllProjects();
    await getAssigneeProjects();

    next();
  } catch (error) {
    console.error("Error fetching project data:", error);
    next({ name: "login" });
  }
};

// Middleware function for editing a project.
export const editProjectMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const id = Number(to.params.id);
  const projectStore = useProjectStore();
  const assigneeStore = useAssigneeStore();
  const { getProject } = projectStore;
  const { getAllAssignee, getProjectAssignees } = assigneeStore;

  try {
    if (id) {
      await getAllAssignee();
      await getProject(id);
      await getProjectAssignees(id);
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    next({ name: "login" });
  }
};

// Middleware function for viewing project details.
export const projectViewMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.name === "project_view" || to.name === "project_timeline_view") {
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
};

export const checkProjectCreatorMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const router = useRouter();
  const userStore = useUserStore();
  const { checkProjectCreator } = userStore;
  try {
    watch(
      () => router.currentRoute.value.params.project_id,
      async (newProjectId) => {
        await checkProjectCreator(Number(newProjectId));
      }
    );
    next();
  } catch (error) {
    console.error("Error fetching project creator data:", error);
    next({ name: "login" });
  }
};

export const projectAssigneesMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const router = useRouter();
  const assigneeStore = useAssigneeStore();
  const { getProjectAssignees } = assigneeStore;
  try {
    watch(
      () => Number(router.currentRoute.value.params.project_id),
      async (newProjectId: number) => {
        await getProjectAssignees(Number(newProjectId));
      }
    );
    next();
  } catch (error) {
    console.error("Error fetching project assignees data:", error);
    next({ name: "login" });
  }
};
