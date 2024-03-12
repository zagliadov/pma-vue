import { defineStore } from "pinia";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";
import { API_URL } from "../../helpers/constants";
import type { IExistingUser, IPersonalInformation } from "../interfaces";
import * as _ from "lodash";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const { existingUser } = storeToRefs(authStore);

  const firstName = ref<string>(
    _.get(existingUser, "value.firstName", "Default first name")
  );
  const lastName = ref<string>(
    _.get(existingUser, "value.lastName", "Default last name")
  );
  const userName = ref<string>(
    _.get(existingUser, "value.name", "Default name")
  );
  const phoneNumber = ref<string>(
    _.get(existingUser, "value.phoneNumber", "+0000000000")
  );
  const language = ref<string>(
    _.get(existingUser, "value.language", "english")
  );
  const timezone = ref<string>(_.get(existingUser, "value.timezone", "usa"));
  const startOfTheCalendarWeek = ref<string>(
    _.get(existingUser, "value.startOfTheCalendarWeek", "sunday")
  );
  const timeFormat = ref<string>(
    _.get(existingUser, "value.timeFormat", "25hour")
  );
  const dateFormat = ref<string>(
    _.get(existingUser, "value.dateFormat", "mm.dd.yyyy")
  );
  const isProjectCreator = ref<boolean>(false);

  /**
   * Updates the user's personal information with the provided data.
   *
   * @param {IPersonalInformation} data - The personal information data to be updated.
   * @throws {Error} If a server error occurs or the request fails.
   * @returns {Promise<void>} A Promise that resolves once the personal information is updated.
   */
  const updatePersonalInformation = async (
    data: IPersonalInformation
  ): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      await axios.post(`${API_URL}/user/update_personal_information`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Personal information updated successfully.");
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to update personal information.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Uploads a photo and updates the existing user's data.
   * @param file - The file to upload.
   * @returns The updated existing user's data, or undefined if there's an issue.
   */
  const uploadPhoto = async (
    file: File
  ): Promise<IExistingUser | undefined> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const formData: FormData = new FormData();
      formData.append("File", file);
      const response: AxiosResponse<{ existingUser: IExistingUser }> =
        await axios.post(`${API_URL}/user/upload_photo`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      existingUser.value = response.data.existingUser;
      console.log(
        "Successfully uploaded photo and updated existing user details."
      );
      return response.data.existingUser;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to upload photo.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Removes the avatar of the existing user and updates their data.
   *
   * @returns The updated existing user's data, or undefined if there's an issue.
   */
  const removeAvatar = async (): Promise<IExistingUser | undefined> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ existingUser: IExistingUser }> =
        await axios.post(
          `${API_URL}/user/remove_avatar_filename`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      existingUser.value = response.data.existingUser;
      console.log(
        "Successfully deleted an existing user's avatar and updated their data."
      );
      return response.data.existingUser;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to remove avatar.");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Checks if the current user is the project creator for a specific project.
   *
   * @param {number} projectId - The ID of the project to check.
   * @throws {Error} If the user is not authenticated or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves with the result of the check.
   */
  const checkProjectCreator = async (projectId: number): Promise<void> => {
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const response: AxiosResponse<{ isProjectCreator: boolean }> =
        await axios.post(
          `${API_URL}/user/check_project_creator`,
          { projectId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      isProjectCreator.value = response?.data?.isProjectCreator;
      console.log(
        "Successfully checks whether the current user is the creator of a specific project."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to check project creator:");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  return {
    firstName,
    lastName,
    userName,
    phoneNumber,
    language,
    timezone,
    startOfTheCalendarWeek,
    timeFormat,
    dateFormat,
    isProjectCreator,
    uploadPhoto,
    removeAvatar,
    updatePersonalInformation,
    checkProjectCreator,
  };
});
