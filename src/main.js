import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import credentials from "./firebase/credentials";

Vue.config.productionTip = false;

firebase.initializeApp(credentials.config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
