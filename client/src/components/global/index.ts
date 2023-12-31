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
import IconNotificationSetting from "../icons/IconNotificationSetting.vue";
import IconPaperclipNotification from "../icons/IconPaperclipNotification.vue";
import IconTrashNotification from "../icons/IconTrashNotification.vue";
import IconDoubleCheckNotification from "../icons/IconDoubleCheckNotification.vue";
import IconArrowRightNotification from "../icons/IconArrowRightNotification.vue";
import IconProfilePersonal from "../icons/IconProfilePersonal.vue";
import IconNotificationPersonal from "../icons/IconNotificationPersonal.vue";
import IconSettingPersonal from "../icons/IconSettingPersonal.vue";
import IconInformationPersonal from "../icons/IconInformationPersonal.vue";
import IconMoreVerticalSettings from "../icons/IconMoreVerticalSettings.vue";
import IconClose from "../icons/IconClose.vue";
import IconUsers from "../icons/IconUsers.vue";
import IconEye from "../icons/IconEye.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconTable from "../icons/IconTable.vue";
import IconTimelineTable from "../icons/IconTimelineTable.vue";
import IconCheck from "../icons/IconCheck.vue";
import IconUploadCloud from "../icons/IconUploadCloud.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconShare from "../icons/IconShare.vue";
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
  { name: "IconNotificationSetting", component: IconNotificationSetting },
  { name: "IconPaperclipNotification", component: IconPaperclipNotification },
  { name: "IconTrashNotification", component: IconTrashNotification },
  { name: "IconDoubleCheckNotification", component: IconDoubleCheckNotification },
  { name: "IconArrowRightNotification", component: IconArrowRightNotification },
  { name: "IconProfilePersonal", component: IconProfilePersonal },
  { name: "IconNotificationPersonal", component: IconNotificationPersonal },
  { name: "IconSettingPersonal", component: IconSettingPersonal },
  { name: "IconInformationPersonal", component: IconInformationPersonal },
  { name: "IconMoreVerticalSettings", component: IconMoreVerticalSettings },
  { name: "IconEdit", component: IconEdit },
  { name: "IconClose", component: IconClose },
  { name: "IconUsers", component: IconUsers },
  { name: "IconEye", component: IconEye },
  { name: "IconTable", component: IconTable },
  { name: "IconTimelineTable", component: IconTimelineTable },
  { name: "IconCheck", component: IconCheck },
  { name: "IconUploadCloud", component: IconUploadCloud },
  { name: "IconFilter", component: IconFilter },
  { name: "IconShare", component: IconShare },
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
