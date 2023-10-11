import { defineStore } from "pinia";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_URL } from "../../helpers/constants";
import type { ICreateTask } from "../interfaces";

export const useTaskStore = defineStore("task", () => {
  /**
   * Creates a new task with the provided user data and attaches files to it for a specific project.
   *
   * @param {ICreateTask} userData - The user data for creating the task.
   * @param {number} projectId - The ID of the project to which the task belongs.
   * @param {File[]} taskFileArray - An array of files to be attached to the task.
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves once the task is successfully created.
   */
  const createTask = async (
    userData: ICreateTask,
    projectId: number,
    taskFileArray: File[]
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const formData: FormData = new FormData();
      formData.append("userData", JSON.stringify(userData));
      formData.append("projectId", projectId.toString());

      taskFileArray.forEach((file: File, index: number) => {
        formData.append(`taskFileArray[${index}]`, file);
      });
      await axios.post(`${API_URL}/task/create_task`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("The task is successfully created.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating task.", error);
      } else {
        throw new Error("Some server error occurred.");
      }
    }
  };

  return {
    createTask,
  };
});
