import { createPinia } from "pinia";
import { useAuthStore } from "./modules/auth";

const pinia = createPinia();

// Register the auth store
pinia.use(useAuthStore);

export default pinia;
