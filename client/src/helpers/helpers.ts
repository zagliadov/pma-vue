import { type Router } from "vue-router";

export const getProjectIdFromCurrentPath = (router: Router): number => {
  const projectId = Number(router?.currentRoute?.value?.params?.project_id);
  return projectId;
};

export const getWorkspaceIdFromCurrentPath = (router: Router): number => {
  const workspaceId = Number(router?.currentRoute?.value?.params?.workspace_id);
  return workspaceId;
};

export const getEmailFromCurrentPath = (router: Router): string => {
  const email = String(router?.currentRoute?.value?.params?.email);
  return email;
};

export const isCreateProjectRoute = (router: Router): boolean => {
  const isProjectRoute = Boolean(
    router?.currentRoute?.value?.name === "create_project"
  );
  return isProjectRoute;
};

export const isMySettingsRoute = (router: Router): boolean => {
  const isMySettingsRoute = Boolean(
    router?.currentRoute?.value?.name === "my_settings"
  );
  return isMySettingsRoute;
};

export const isNotificationRoute = (router: Router): boolean => {
  const isNotificationRoute = Boolean(
    router?.currentRoute?.value?.name === "notification"
  );
  return isNotificationRoute;
};

export const isProjectsRoute = (router: Router): boolean => {
  const isProjectsRoute = Boolean(
    router?.currentRoute?.value?.name === "projects"
  );
  return isProjectsRoute;
};

export const isInformationRoute = (router: Router): boolean => {
  const isInformationRoute = Boolean(
    router?.currentRoute?.value?.name === "information"
  );
  return isInformationRoute;
};

export const parseUsernameFromEmail = (email: string): string | null => {
  const regex = /^(.*?)@/;
  const result = email.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return null;
};

export const getRouteParams = (
  router: Router
): { email: string; workspaceId: number; projectId: number } => {
  const email = getEmailFromCurrentPath(router);
  const workspaceId = getWorkspaceIdFromCurrentPath(router);
  const projectId = getProjectIdFromCurrentPath(router);

  return { email, workspaceId, projectId };
};

export const createMainTableRoute = (router: Router): string => {
  const { email, workspaceId, projectId } = getRouteParams(router);
  const mainTableRoute = `/${email}/workspace/${workspaceId}/project/${projectId}`;
  return mainTableRoute;
};

export const createTimelineTableRoute = (router: Router): string => {
  const { email, workspaceId, projectId } = getRouteParams(router);
  const timelineTableRoute = `/${email}/workspace/${workspaceId}/project/${projectId}/timeline`;
  return timelineTableRoute;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const capitalizeFirstLetter = (name: string): string => {
  if (name.length === 0) {
    return name;
  }
  return name.charAt(0).toLocaleUpperCase();
};
