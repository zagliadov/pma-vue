import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import type { ICreateTask } from "../interfaces";

export const useTaskStore = defineStore("task", () => {

  const createTask = async (
    userData: ICreateTask,
    projectId: number,
    email: string,
    taskFileArray: File[]
  ) => {
    try {
      const formData = new FormData();
      formData.append("userData", JSON.stringify(userData));
      formData.append("projectId", projectId.toString());
      formData.append("email", email);

      taskFileArray.forEach((file, index) => {
        formData.append(`taskFileArray[${index}]`, file);
      });

      const response = await axios.post(
        `${API_URL}/task/create_task`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Task created successfully", response.data);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return {
    createTask,
  };
});
