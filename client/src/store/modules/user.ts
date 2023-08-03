import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useUserStore = defineStore("user", () => {
  const uploadPhoto = async (file: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      console.log("UPLOAD");
      const response = await axios.post(
        `${API_URL}/user/upload_photo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    uploadPhoto,
  };
});
