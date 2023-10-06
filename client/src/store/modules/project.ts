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

  const deleteProject = async (projectId: number): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      const response: AxiosResponse<{ allProjects: IProject[] }> =
        await axios.delete(`${API_URL}/project/delete_project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      allProjects.value = response.data.allProjects;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred:");
      }
    }
  };

  const getAllProjects = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred:");
      }
    }
  };

  const getTotalProjectCount = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred:");
      }
    }
  };

  const getProjects = async (workspaceId: number): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    try {
      const response: AxiosResponse<{ projects: IProject[] }> =
        await axios.post<{ projects: IProject[] }>(
          `${API_URL}/project/get_projects`,
          { workspaceId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      projects.value = response.data.projects;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const getProject = async (projectId: number): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
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
      project.value = response.data.project;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const addNewProject = async (data: IAddNewProjectData): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    try {
      const response: AxiosResponse<{ projects: IProject[] }> =
        await axios.post(`${API_URL}/project/add_new_project`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      projects.value = response.data.projects;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        throw new Error("Some server error occurred");
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
