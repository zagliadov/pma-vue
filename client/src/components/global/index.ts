import CustomInput from "../CustomInput/CustomInput.vue";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.vue";
import AppleLoginButton from "../AppleLoginButton/AppleLoginButton.vue";
import IconLeftArrow from "../icons/IconLeftArrow.vue";
import IconGoogle from "../icons/IconGoogle.vue";
import IconApple from "../icons/IconApple.vue";
import Footer from "../Footer/Footer.vue";
import Navigation from "../Navigation/Navigation.vue";

const components = [
  { name: "CustomInput", component: CustomInput },
  { name: "GoogleLoginButton", component: GoogleLoginButton },
  { name: "AppleLoginButton", component: AppleLoginButton },
  { name: "IconLeftArrow", component: IconLeftArrow },
  { name: "IconGoogle", component: IconGoogle },
  { name: "IconApple", component: IconApple },
  { name: "Footer", component: Footer },
  { name: "Navigation", component: Navigation },
];
export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};
