import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
// import axios from "./services/axios-auth";
import localForage from "localforage";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import App from "./firebase/app";

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
  key: "tagPro",
  storage: localForage
  // Can also change this to explicitly use window.localStorage or window.sessionStorage
});

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    refreshToken: null,
    // expirationDate: null,
    userId: null,
    user: null
  },
  mutations: {
    login(state, userData) {
      console.log("userData", userData);
      state.refreshToken = userData.refreshToken;
      state.userId = userData.userId;
      // state.expirationDate = userData.expirationDate;
      state.user = userData.user;
    },
    logout(state) {
      state.refreshToken = "";
      state.userId = "";
      // state.expirationDate = "";
      state.user = "";
    }
  },
  actions: {
    // LOGIN WITH AXIOS AND FIREBASE REST API

    // login({ commit }, authData) {
    //   axios
    //     .post(
    //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
    //       {
    //         email: authData.email,
    //         password: authData.password,
    //         returnSecureToken: true
    //       }
    //     )
    //     .then(res => {
    //       console.log(commit, res);
    //       const now = new Date();
    //       const expirationDate = new Date(
    //         now.getTime() + res.data.expiresIn * 1000
    //       );
    //       commit("login", {
    //         token: res.data.idToken,
    //         userId: res.data.localId,
    //         expirationDate: expirationDate,
    //         user: res.data.email
    //       });
    //       router.push("/dashboard");
    //     })
    //     .catch(error => console.log(error));
    // },
    // LOGIN WITH FIREBASE METHODS
    login({ commit }, authData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          console.log("commit", commit);
          console.log("user", response);
          console.log("user", response.user.refreshToken);
          commit("login", {
            refreshToken: response.user.refreshToken,
            userId: response.user.uid,
            // expirationDate: expirationDate,
            user: response.user.email
          });
          router.push("./dashboard");
        })
        .catch(err => console.log(err));
    },
    logout({ commit }) {
      commit("logout");
      router.push("/login");
    }
  },
  getters: {
    // partially implemented
    loggedIn: state => !!state.refreshToken
  }
});
