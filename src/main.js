import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import credentials from "./firebase/credentials";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/styles.scss";
import "./assets/vendor/fontAwesome/css/all.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

firebase.initializeApp(credentials.config);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
