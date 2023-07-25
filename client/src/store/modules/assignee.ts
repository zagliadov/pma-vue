import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useAssigneeStore = defineStore("assignee", () => {
  const assigneeProjects = ref<any>([]);

  const getAssigneeProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/assignee/get_assignee_projects`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      assigneeProjects.value = response?.data?.assigneeProjects;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    assigneeProjects,
    getAssigneeProjects,
  };
});
