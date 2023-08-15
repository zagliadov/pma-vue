import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";
import { API_URL } from "../../helpers/constants";
import type { IExistingUser, IPersonalInformation } from "../interfaces";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const { existingUser } = storeToRefs(authStore);
  const firstName = ref<string>(existingUser?.value?.firstName || "");
  const lastName = ref<string>(existingUser?.value?.lastName || "");
  const userName = ref<string>(existingUser?.value?.name || "");
  const phoneNumber = ref<string>(existingUser?.value?.phoneNumber || "");
  const language = ref<string>(existingUser?.value?.language || "");
  const timezone = ref<string>(existingUser?.value?.timezone || "");
  const startOfTheCalendarWeek = ref<string>(existingUser?.value?.startOfTheCalendarWeek || "");
  const timeFormat = ref<string>(existingUser?.value?.timeFormat || "");
  const dateFormat = ref<string>(existingUser?.value?.dateFormat || "");
  

  const updatePersonalInformation = async (data: IPersonalInformation) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.post(
        `${API_URL}/user/update_personal_information`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Uploads a photo and updates the existing user's data.
   *
   * @param file - The file to upload.
   * @returns The updated existing user's data, or undefined if there's an issue.
   */
  const uploadPhoto = async (
    file: File
  ): Promise<IExistingUser | undefined> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("File", file);
      const response = await axios.post<{ existingUser: IExistingUser }>(
        `${API_URL}/user/upload_photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return (existingUser.value = response.data.existingUser);
      } else {
        console.log("Failed to upload photo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Removes the avatar of the existing user and updates their data.
   *
   * @returns The updated existing user's data, or undefined if there's an issue.
   */
  const removeAvatar = async (): Promise<IExistingUser | undefined> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post<{ existingUser: IExistingUser }>(
        `${API_URL}/user/remove_avatar_filename`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (existingUser.value) {
          return (existingUser.value = response.data.existingUser);
        }
      } else {
        console.log("Failed to remove avatar");
      }
    } catch (error) {
      console.log(error);
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
    uploadPhoto,
    removeAvatar,
    updatePersonalInformation,
  };
});
