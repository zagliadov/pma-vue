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
  const assigneeProjects = ref<any>([]);
  const membersCount = ref<number>(0);
  const members = ref<IMembers[]>([]);
  const projectAssignees = ref<IProjectAssignees[]>([]);
  const message = ref<string | null>(null);

  const getAllAssignee = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Some kind of server error: ", error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const getAssigneeProjects = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Some kind of server error: ", error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const removeProjectAssignee = async (
    assigneeId: number,
    projectId: number,
    assigneeEmail: string
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) return;
      await axios.delete(
        `${API_URL}/assignee/remove_assignee/${assigneeId}/${assigneeEmail}/from_project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Some kind of server error: ", error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const getProjectAssignees = async (projectId: number): Promise<void> => {
    try {
      const response: AxiosResponse<{ projectAssignees: IProjectAssignees[] }> =
        await axios.get(
          `${API_URL}/assignee/get_project_assignees/${projectId}`
        );
      projectAssignees.value = response.data.projectAssignees;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Some kind of server error: ", error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const addAssigneeToProject = async (
    projectId: number,
    newAssigneeEmail: string
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) return console.log("Token not found");

      await axios.post(
        `${API_URL}/assignee/add_new_assignee_to_project`,
        { projectId, newAssigneeEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Some kind of server error: ", error);
        message.value = error.response?.data.message || "Unknown server error";
      } else {
        throw new Error("Some server error occurred");
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
