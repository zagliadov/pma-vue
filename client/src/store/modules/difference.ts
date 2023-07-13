import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiffStore = defineStore("difference", () => {
  const isSideMenuOpen = ref<boolean>(false);
  const isSpaceOpen = ref<boolean>(false);

  const setIsSideMenuOpen = () => {
    return isSideMenuOpen.value = !isSideMenuOpen.value;
  };

  const setIsSpaceOpen = () => {
    return isSpaceOpen.value = !isSpaceOpen.value;
  }

  return {
    isSideMenuOpen,
    setIsSideMenuOpen,
    isSpaceOpen,
    setIsSpaceOpen,
  };
});
