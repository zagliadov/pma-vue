import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../../helpers/constants";

export const useUserStore = defineStore("user", () => {
  const avatar_filename = ref<string | null>(null);

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
      avatar_filename.value = response?.data?.avatar_filename;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    avatar_filename,
    uploadPhoto,
  };
});
