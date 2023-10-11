import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_URL } from "../../helpers/constants";
import type {
  IAssigneeProjects,
  IMembers,
  IProjectAssignees,
} from "../interfaces";

export const useAssigneeStore = defineStore("assignee", () => {
  const assigneeProjects = ref<IAssigneeProjects[]>([]);
  const membersCount = ref<number>(0);
  const members = ref<IMembers[]>([]);
  const projectAssignees = ref<IProjectAssignees[]>([]);
  const message = ref<string | null>(null);

  /**
   * Retrieves a list of all assignees for a project, along with the total count of assignees.
   *
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves with the list of assignees and the total count.
   */
  const getAllAssignee = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{
        membersCount: number;
        combinedResults: IProjectAssignees[];
      }> = await axios.post(
        `${API_URL}/assignee/get_all_assignee`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      membersCount.value = response?.data?.membersCount;
      members.value = response?.data?.combinedResults;
      console.log(
        "You have successfully received all assignees of the project."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to get project assignees.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Retrieves a list of projects assigned to the authenticated user.
   *
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves with the list of assigned projects.
   */
  const getAssigneeProjects = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ assigneeProjects: IAssigneeProjects[] }> =
        await axios.post(
          `${API_URL}/assignee/get_assignee_projects`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      assigneeProjects.value = response?.data?.assigneeProjects;
      console.log("Successfully received assigned projects.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to get assigned projects.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Removes a project assignee from a specific project.
   *
   * @param {number} assigneeId - The ID of the assignee to be removed.
   * @param {number} projectId - The ID of the project from which the assignee should be removed.
   * @param {string} assigneeEmail - The email of the assignee to be removed.
   * @throws {Error} If the user is not authenticated, the removal fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves once the assignee is successfully removed.
   */
  const removeProjectAssignee = async (
    assigneeId: number,
    projectId: number,
    assigneeEmail: string
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const response: AxiosResponse<{ status: boolean }> = await axios.delete(
        `${API_URL}/assignee/remove_assignee/${assigneeId}/${assigneeEmail}/from_project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("The project assignee was successfully removed.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to remove project assignee.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Retrieves a list of assignees for a specific project by its ID.
   *
   * @param {number} projectId - The ID of the project for which to retrieve assignees.
   * @throws {Error} If the request fails or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves with the list of project assignees.
   */
  const getProjectAssignees = async (projectId: number): Promise<void> => {
    try {
      const response: AxiosResponse<{ projectAssignees: IProjectAssignees[] }> =
        await axios.get(
          `${API_URL}/assignee/get_project_assignees/${projectId}`
        );
      projectAssignees.value = response.data.projectAssignees;
      console.log("Successfully retrieved project assignees.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to retrieve project assignees.");
      } else {
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Adds a new assignee to a specific project by project ID.
   *
   * @param {number} projectId - The ID of the project to which the assignee should be added.
   * @param {string} newAssigneeEmail - The email of the new assignee to be added.
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves once the assignee is successfully added.
   */
  const addAssigneeToProject = async (
    projectId: number,
    newAssigneeEmail: string
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const response: AxiosResponse<{ status: boolean }> = await axios.post(
        `${API_URL}/assignee/add_new_assignee_to_project`,
        { projectId, newAssigneeEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Successfully adding a new assignee to a project.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to adding a new assignee to a project.");
      } else {
        throw new Error("Some server error occurred.");
      }
    }
  };

  return {
    assigneeProjects,
    membersCount,
    members,
    projectAssignees,
    message,
    getAssigneeProjects,
    getAllAssignee,
    removeProjectAssignee,
    getProjectAssignees,
    addAssigneeToProject,
  };
});
