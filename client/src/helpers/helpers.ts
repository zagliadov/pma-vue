import { type Router } from "vue-router";

/**
 * Retrieves the project_id parameter from the current route path using the Vue Router.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {number} The project_id parameter from the current route path.
 */
export const getProjectIdFromCurrentPath = (router: Router): number => {
  const projectId = Number(router?.currentRoute?.value?.params?.project_id);
  return projectId;
};

/**
 * Retrieves the workspace_id parameter from the current route path using the Vue Router.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {number} The workspace_id parameter from the current route path.
 */
export const getWorkspaceIdFromCurrentPath = (router: Router): number => {
  const workspaceId = Number(router?.currentRoute?.value?.params?.workspace_id);
  return workspaceId;
};

/**
 * Retrieves the email parameter from the current route path using the Vue Router.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {string} The email parameter from the current route path.
 */
export const getEmailFromCurrentPath = (router: Router): string => {
  const email = String(router?.currentRoute?.value?.params?.email);
  return email;
};

/**
 * Checks if the current route in the Vue Router is the "create_project" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "create_project," otherwise false.
 */
export const isCreateProjectRoute = (router: Router): boolean => {
  const isProjectRoute = Boolean(
    router?.currentRoute?.value?.name === "create_project"
  );
  return isProjectRoute;
};

/**
 * Checks if the current route in the Vue Router is the "my_settings" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "my_settings," otherwise false.
 */
export const isMySettingsRoute = (router: Router): boolean => {
  const isMySettingsRoute = Boolean(
    router?.currentRoute?.value?.name === "my_settings"
  );
  return isMySettingsRoute;
};

/**
 * Checks if the current route in the Vue Router is either the "project_view" or "project_timeline_view" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "project_view" or "project_timeline_view," otherwise false.
 */
export const isProjectViewRoute = (router: Router): boolean => {
  const name = router?.currentRoute?.value?.name;
  const isProjectViewRoute = Boolean(
    name === "project_view" || name === "project_timeline_view"
  );
  return isProjectViewRoute;
};

/**
 * Checks if the current route in the Vue Router is the "notification" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "notification," otherwise false.
 */
export const isNotificationRoute = (router: Router): boolean => {
  const isNotificationRoute = Boolean(
    router?.currentRoute?.value?.name === "notification"
  );
  return isNotificationRoute;
};

/**
 * Checks if the current route in the Vue Router is the "projects" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "projects," otherwise false.
 */
export const isProjectsRoute = (router: Router): boolean => {
  const isProjectsRoute = Boolean(
    router?.currentRoute?.value?.name === "projects"
  );
  return isProjectsRoute;
};

/**
 * Checks if the current route in the Vue Router is the "my_settings_edit_project" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "my_settings_edit_project," otherwise false.
 */
export const isProjectsEditProjectRoute = (router: Router): boolean => {
  const isProjectsEditProjectRoute = Boolean(
    router?.currentRoute?.value?.name === "my_settings_edit_project"
  );
  return isProjectsEditProjectRoute;
};

/**
 * Checks if the current route in the Vue Router is the "information" route.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {boolean} True if the current route is "information," otherwise false.
 */
export const isInformationRoute = (router: Router): boolean => {
  const isInformationRoute = Boolean(
    router?.currentRoute?.value?.name === "information"
  );
  return isInformationRoute;
};

/**
 * Parses the username from an email address.
 *
 * @param {string} email - The email address to parse.
 * @returns {string | null} The parsed username or null if parsing fails.
 */
export const parseUsernameFromEmail = (email: string): string | null => {
  const regex = /^(.*?)@/;
  const result = email.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return null;
};

/**
 * Get route parameters (email, workspaceId, and projectId) from the current router instance.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {{ email: string; workspaceId: number; projectId: number }} The route parameters.
 */
export const getRouteParams = (
  router: Router
): { email: string; workspaceId: number; projectId: number } => {
  const email = getEmailFromCurrentPath(router);
  const workspaceId = getWorkspaceIdFromCurrentPath(router);
  const projectId = getProjectIdFromCurrentPath(router);

  return { email, workspaceId, projectId };
};

/**
 * Create a route for the main table based on route parameters.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {string} The generated main table route.
 */
export const createMainTableRoute = (router: Router): string => {
  const { email, workspaceId, projectId } = getRouteParams(router);
  const mainTableRoute = `/${email}/workspace/${workspaceId}/project/${projectId}`;
  return mainTableRoute;
};

/**
 * Create a route for the timeline table based on route parameters.
 *
 * @param {Router} router - The Vue Router instance.
 * @returns {string} The generated timeline table route.
 */
export const createTimelineTableRoute = (router: Router): string => {
  const { email, workspaceId, projectId } = getRouteParams(router);
  const timelineTableRoute = `/${email}/workspace/${workspaceId}/project/${projectId}/timeline`;
  return timelineTableRoute;
};

/**
 * Validate an email address using a regular expression.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is valid, `false` otherwise.
 */
export const validateEmail = (email: string): boolean => {
  // Regular expression for a valid email address
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} inputString - The input string to capitalize.
 * @returns {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (inputString: string): string => {
  return inputString.charAt(0).toUpperCase();
};

/**
 * Converts a hexadecimal color value (HEX) to RGBA format.
 *
 * @param {string} hex - The color value in HEX format (e.g., "#FF0000" for red).
 * @param {number} opacity - The opacity value (a number between 0 and 1, where 0 is fully transparent, and 1 is fully opaque).
 * @returns {string} An RGBA string (e.g., "rgba(255, 0, 0, 0.5)" for semi-transparent red).
 */
export const hexToRgba = (hex: string, opacity: number) => {
  // Remove the "#" symbol from HEX.
  hex = hex.replace("#", "");

  // Extract the red (R), green (G), and blue (B) components from HEX.
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Create an RGBA string with the specified opacity.
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Converts bytes to megabytes with precision.
 *
 * @param {number} bytes - The value in bytes to convert.
 * @param {number} precision - The number of decimal places to round to (default is 2).
 * @returns {number} The value in megabytes.
 */
export const bytesToMegabytes = (
  bytes: number,
  precision: number = 2
): number => {
  if (isNaN(bytes) || bytes <= 0) {
    throw new Error("Invalid input. Bytes must be a positive number.");
  }

  const megabytes = bytes / 1024 / 1024;
  return parseFloat(megabytes.toFixed(precision));
};
