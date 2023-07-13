import CustomInput from "../CustomInput/CustomInput.vue";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.vue";
import AppleLoginButton from "../AppleLoginButton/AppleLoginButton.vue";
import IconLeftArrow from "../icons/IconLeftArrow.vue";
import IconGoogle from "../icons/IconGoogle.vue";
import IconApple from "../icons/IconApple.vue";
import IconSideMenu from "../icons/IconSideMenu.vue";
import IconCheckCircle from "../icons/IconCheckCircle.vue";
import IconChevron from "../icons/IconChevron.vue";
import Footer from "../Footer/Footer.vue";
import Navigation from "../Navigation/Navigation.vue";
import Layout from "../Layout/Layout.vue";
import SideMenu from "../SideMenu/SideMenu.vue";

const components = [
  { name: "CustomInput", component: CustomInput },
  { name: "GoogleLoginButton", component: GoogleLoginButton },
  { name: "AppleLoginButton", component: AppleLoginButton },
  { name: "IconLeftArrow", component: IconLeftArrow },
  { name: "IconGoogle", component: IconGoogle },
  { name: "IconApple", component: IconApple },
  { name: "IconSideMenu", component: IconSideMenu },
  { name: "IconCheckCircle", component: IconCheckCircle },
  { name: "IconChevron", component: IconChevron },
  { name: "Footer", component: Footer },
  { name: "Navigation", component: Navigation },
  { name: "Layout", component: Layout },
  { name: "SideMenu", component: SideMenu },
];
export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};
