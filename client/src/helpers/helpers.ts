import axios from "axios";
import { API_URL } from "./constants";
export const parseUsernameFromEmail = (email: string): string | null => {
  const regex = /^(.*?)@/;
  const result = email.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return null;
};

export const checkAuthentication = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.post(
      `${API_URL}/auth/verify_token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      if (response.status === 200) return true;
    // Здесь должна быть проверка валидности токена на сервере
    // Верните true, если токен валиден, или выполните другую проверку аутентификации
  }
  return false;
};