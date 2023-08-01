import CustomInput from "../CustomInput/CustomInput.vue";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.vue";
import AppleLoginButton from "../AppleLoginButton/AppleLoginButton.vue";
import IconLeftArrow from "../icons/IconLeftArrow.vue";
import IconGoogle from "../icons/IconGoogle.vue";
import IconApple from "../icons/IconApple.vue";
import IconSideMenu from "../icons/IconSideMenu.vue";
import IconCheckCircle from "../icons/IconCheckCircle.vue";
import IconChevron from "../icons/IconChevron.vue";
import IconPlus from "../icons/IconPlus.vue";
import IconNoProject from "../icons/IconNoProject.vue";
import IconMainTableColumns from "../icons/IconMainTableColumns.vue";
import IconBell from "../icons/IconBell.vue";
import IconSettings from "../icons/IconSettings.vue";
import IconHelp from "../icons/IconHelp.vue";
import IconMySettingsUser from "../icons/IconMySettingsUser.vue";
import IconMySettingsBell from "../icons/IconMySettingsBell.vue";
import IconMySettingsProject from "../icons/IconMySettingsProject.vue";
import IconMySettingsHelp from "../icons/IconMySettingsHelp.vue";
import IconMySettingsLogOut from "../icons/IconMySettingsLogOut.vue";
import Footer from "../Footer/Footer.vue";
import Navigation from "../Navigation/Navigation.vue";
import Layout from "../Layout/Layout.vue";
import MySettingsLayout from "../MySettingsLayout/MySettingsLayout.vue";
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
  { name: "IconPlus", component: IconPlus },
  { name: "IconNoProject", component: IconNoProject },
  { name: "IconMainTableColumns", component: IconMainTableColumns },
  { name: "IconSettings", component: IconSettings },
  { name: "IconBell", component: IconBell },
  { name: "IconHelp", component: IconHelp },
  { name: "IconMySettingsUser", component: IconMySettingsUser },
  { name: "IconMySettingsBell", component: IconMySettingsBell },
  { name: "IconMySettingsProject", component: IconMySettingsProject },
  { name: "IconMySettingsHelp", component: IconMySettingsHelp },
  { name: "IconMySettingsLogOut", component: IconMySettingsLogOut },
  { name: "Footer", component: Footer },
  { name: "Navigation", component: Navigation },
  { name: "Layout", component: Layout },
  { name: "MySettingsLayout", component: MySettingsLayout },
  { name: "SideMenu", component: SideMenu },
];
export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};
