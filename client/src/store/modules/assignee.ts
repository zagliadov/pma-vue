import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import type { IMembers, IProjectAssignees } from "../interfaces";

export const useAssigneeStore = defineStore("assignee", () => {
  const assigneeProjects = ref<any>([]);
  const membersCount = ref<number>(0);
  const members = ref<IMembers[]>([]);
  const projectAssignees = ref<IProjectAssignees[]>([]);

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
      members.value = response?.data?.combinedResults;
    } catch (error) {
      console.log(error);
    }
  };
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

  const removeProjectAssignee = async (
    assigneeId: number,
    projectId: number,
    assigneeEmail: string,
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.delete(
        `${API_URL}/assignee/remove_assignee/${assigneeId}/${assigneeEmail}/from_project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "response.data from store, fn: removeProjectAssignee")
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProjectAssignees = async (projectId: number) => {
    try {
      const response = await axios.get(
        `${API_URL}/assignee/get_project_assignees/${projectId}`
      );
      projectAssignees.value = response.data.projectAssignees;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return {
    assigneeProjects,
    membersCount,
    members,
    projectAssignees,
    getAssigneeProjects,
    getAllAssignee,
    removeProjectAssignee,
    getProjectAssignees,
  };
});
