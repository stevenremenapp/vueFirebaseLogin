import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import credentials from "./firebase/credentials";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/styles.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

firebase.initializeApp(credentials.config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
