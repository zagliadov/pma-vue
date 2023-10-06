import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiffStore = defineStore("difference", () => {
  const isSideMenuOpen = ref<boolean>(false);
  const setIsSideMenuOpen = (): void => {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  };

  return {
    isSideMenuOpen,
    setIsSideMenuOpen,
  };
});
