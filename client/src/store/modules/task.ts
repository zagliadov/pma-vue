import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../helpers/constants";
import type { ICreateTask } from "../interfaces";

export const useTaskStore = defineStore("task", () => {
  const createTask = async (
    userData: ICreateTask,
    projectId: number,
    taskFileArray: File[]
  ): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) return;
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
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating task", error);
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  return {
    createTask,
  };
});
