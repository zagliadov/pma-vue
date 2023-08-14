import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiffStore = defineStore("difference", () => {
  const isSideMenuOpen = ref<boolean>(false);
  const isNotificationOpen = ref<boolean>(false);

  const setIsSideMenuOpen = () => {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  };
  const setIsNotificationOpen = () => {
    isNotificationOpen.value = !isNotificationOpen.value;
  }

  return {
    isSideMenuOpen,
    isNotificationOpen,
    setIsSideMenuOpen,
    setIsNotificationOpen,
  };
});
