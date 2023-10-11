import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_URL } from "../../helpers/constants";
import type { IProject, IAddNewProjectData } from "../interfaces";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<IProject[]>([]);
  const project = ref<IProject>();
  const totalProjectsCount = ref<number>(0);
  const allProjects = ref<IProject[]>([]);

  /**
   * Deletes a project with the specified project ID.
   *
   * @param {number} projectId - The ID of the project to be deleted.
   * @throws {Error} If the request fails, the project deletion is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after the project is successfully deleted.
   */
  const deleteProject = async (projectId: number): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const response: AxiosResponse<{ allProjects: IProject[] }> =
        await axios.delete(`${API_URL}/project/delete_project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      allProjects.value = response.data.allProjects;
      console.log(
        "Successful deletion of the project with the specified project ID."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to delete the project.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Edits the name of a project with the specified project ID.
   *
   * @param {string} newName - The new name for the project.
   * @param {number} projectId - The ID of the project to be edited.
   * @throws {Error} If the request fails, the project name editing is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after the project name is successfully edited.
   */
  const editProjectName = async (
    newName: string,
    projectId: number
  ): Promise<void> => {
    try {
      const response: AxiosResponse<{ project: IProject }> = await axios.post(
        `${API_URL}/project/edit_project_name`,
        { newName, projectId }
      );
      project.value = response?.data?.project;
      console.log("Successful editing of the project name.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to edit the project name.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Fetches all projects associated with the authenticated user.
   *
   * @throws {Error} If the request fails, the retrieval of projects is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after successfully fetching and updating the list of all projects.
   */
  const getAllProjects = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ allProjects: IProject[] }> =
        await axios.post(
          `${API_URL}/project/get_all_projects`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      allProjects.value = response?.data?.allProjects;
      console.log(
        "Successfully retrieve all projects associated with the authenticated user."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error(
          "Failed to get all projects associated with authenticated user."
        );
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Fetches the total count of projects associated with the authenticated user.
   *
   * @throws {Error} If the request fails, the total project count retrieval is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after successfully fetching the total project count.
   */
  const getTotalProjectCount = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ totalProjectsCount: number }> =
        await axios.post(
          `${API_URL}/project/get_total_project_count`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      totalProjectsCount.value = response?.data?.totalProjectsCount;
      console.log(
        "Successfully retrieve the total number of projects associated with the authenticated user."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error(
          "The total number of projects associated with the authenticated user could not be retrieved."
        );
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Fetches a list of projects associated with the specified workspace.
   *
   * @param {number} workspaceId - The ID of the workspace to retrieve projects from.
   * @throws {Error} If the request fails, project retrieval is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after successfully fetching the projects.
   */
  const getProjects = async (workspaceId: number): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ projects: IProject[] }> =
        await axios.post(
          `${API_URL}/project/get_projects`,
          { workspaceId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      projects.value = response.data.projects;
      console.log(
        "Successfully retrieved a list of projects associated with the specified workspace."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error(
          "The list of projects associated with the specified workspace could not be retrieved."
        );
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Fetches a project by its ID.
   *
   * @param {number} projectId - The ID of the project to retrieve.
   * @throws {Error} If the request fails, project retrieval is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after successfully fetching the project.
   */
  const getProject = async (projectId: number): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ project: IProject }> = await axios.post(
        `${API_URL}/project/get_project`,
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Successfully retrieving a project by its ID.");
      project.value = response.data.project;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Could not get the project by its ID.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Adds a new project with the provided data.
   *
   * @param {IAddNewProjectData} data - The data to create the new project.
   * @throws {Error} If the request fails, project creation is unsuccessful, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves after successfully adding a new project with the provided data.
   */
  const addNewProject = async (data: IAddNewProjectData): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ projects: IProject[] }> =
        await axios.post(`${API_URL}/project/add_new_project`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      projects.value = response.data.projects;
      console.log("Successfully added a new project with the provided data.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to add a new project with the provided data.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  return {
    projects,
    project,
    totalProjectsCount,
    allProjects,
    getProjects,
    getProject,
    addNewProject,
    getTotalProjectCount,
    getAllProjects,
    editProjectName,
    deleteProject,
  };
});
