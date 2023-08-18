import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import type { IMembers } from "../interfaces";

export const useAssigneeStore = defineStore("assignee", () => {
  const assigneeProjects = ref<any>([]);
  const membersCount = ref<number>(0);
  const members = ref<IMembers[]>([]);

  const getAllAssignee = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/assignee/get_all_assignee`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      membersCount.value = response?.data?.membersCount;
      members.value = response?.data?.users;
    } catch (error) {
      console.log(error);
    }
  }
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
    membersCount,
    members,
    getAssigneeProjects,
    getAllAssignee,
  };
});
