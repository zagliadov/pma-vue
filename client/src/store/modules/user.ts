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

  const uploadPhoto = async (
    file: File
  ): Promise<IExistingUser | undefined> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("File", file);
      const response = await axios.post(
        `${API_URL}/user/upload_photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return existingUser.value = response.data.existingUser;
      } else {
        console.log("Failed to upload photo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeAvatar = async (): Promise<IExistingUser | undefined> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
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
          return existingUser.value = response.data.existingUser;
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
