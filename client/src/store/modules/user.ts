import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const { existingUser } = storeToRefs(authStore);

  const uploadPhoto = async (file: any) => {
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
      return existingUser.value = response?.data?.existingUser;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    uploadPhoto,
  };
});
