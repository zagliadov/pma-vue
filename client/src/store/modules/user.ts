import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";
import { API_URL } from "../../helpers/constants";
import type { IExistingUser } from "../interfaces";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const { existingUser } = storeToRefs(authStore);

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
    uploadPhoto,
    removeAvatar,
  };
});
