import { useAssigneeStore } from "@/store/modules/assignee";
import { useAuthStore } from "@/store/modules/auth";
import { useProjectStore } from "@/store/modules/project";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const homeMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  next("login");
};

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

export const editProjectMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const id = Number(to.params.id);
  const projectStore = useProjectStore();
  const assigneeStore = useAssigneeStore();
  const { getProject } = projectStore;
  const { getAllAssignee } = assigneeStore;

  try {
    await getAllAssignee();
    await getProject(id);
  } catch (error) {
    console.error("Error fetching project data:", error);
    next({ name: "login" });
  }
};

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
