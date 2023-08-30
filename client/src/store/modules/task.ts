import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import type { ICreateTask } from "../interfaces";

export const useTaskStore = defineStore("task", () => {

  const uploadFile = async (file: File) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("File", file);
      const response = await axios.post(
        `${API_URL}/task/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (userData: ICreateTask, projectId: number, email: string) => {
    console.log(projectId, email);
  }

  return {
    uploadFile,
    createTask,
  };
});
