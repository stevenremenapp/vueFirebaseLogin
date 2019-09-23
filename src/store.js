import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import axios from "./services/axios-auth";
import localForage from "localforage";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "./main";
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
    userEmail: null,
    userFirstName: null,
    userLastName: null,
    userProStatus: null,
    userBusinessName: null,
    homeImages: []
  },
  mutations: {
    GET_HOME_IMAGES(state, images) {
      state.homeImages = images.homeImages;
    },
    LOGIN(state, userData) {
      console.log("userData", userData);
      state.refreshToken = userData.refreshToken;
      state.userId = userData.userId;
      // state.expirationDate = userData.expirationDate;
      state.userEmail = userData.userEmail;
    },
    LOGOUT(state) {
      state.refreshToken = null;
      state.userId = null;
      // state.expirationDate = "";
      state.userEmail = null;
      state.userBusinessName = null;
      state.userFirstName = null;
      state.userLastName = null;
      state.userProStatus = null;
    },
    SET_USER_DATA(state, userData) {
      console.log("USER DATA", userData);
      if (userData.businessName !== null) {
        state.userBusinessName = userData.userBusinessName;
      }
      state.userFirstName = userData.userFirstName;
      state.userLastName = userData.userLastName;
      state.userProStatus = userData.userProStatus;
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
    getHomeImages({ commit }) {
      axios.get("https://picsum.photos/v2/list?limit=20").then(response => {
        commit("GET_HOME_IMAGES", {
          homeImages: response.data
        });
      });
    },
    loginPro({ commit }, authData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          // console.log("commit", commit);
          console.log("user", response);
          console.log("user", response.user.refreshToken);
          db.collection("pros")
            .doc(response.user.uid)
            .get()
            .then(response => {
              console.log(response.data());
              commit("SET_USER_DATA", {
                userBusinessName: response.data().businessName,
                userFirstName: response.data().firstName,
                userLastName: response.data().lastName,
                userProStatus: response.data().userProStatus
              });
            });
          commit("LOGIN", {
            refreshToken: response.user.refreshToken,
            userId: response.user.uid,
            // expirationDate: expirationDate,
            userEmail: response.user.email
          });
          router.push("./dashboard");
        })
        .catch(err => console.log(err));
    },
    loginConsumer({ commit }, authData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          // console.log("commit", commit);
          console.log("user", response);
          console.log("user", response.user.refreshToken);
          db.collection("users")
            .doc(response.user.uid)
            .get()
            .then(response => {
              console.log(response.data());
              commit("SET_USER_DATA", {
                userBusinessName: null,
                userFirstName: response.data().firstName,
                userLastName: response.data().lastName,
                userProStatus: response.data().userProStatus
              });
            });
          commit("LOGIN", {
            refreshToken: response.user.refreshToken,
            userId: response.user.uid,
            // expirationDate: expirationDate,
            userEmail: response.user.email
          });
          router.push("./dashboard");
        })
        .catch(err => console.log(err));
    },
    logout({ commit }) {
      commit("LOGOUT");
      router.push("/");
    },
    signupConsumer({ commit }, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          // console.log(commit);
          // console.log(response);
          console.log(response.user.uid);
          console.log(authData);
          const createdAt = new Date();
          let firstName = authData.firstName;
          let lastName = authData.lastName;
          let userProStatus = false;
          db.collection("users")
            .doc(response.user.uid)
            .set({ createdAt, firstName, lastName, userProStatus });
          commit("LOGIN", {
            refreshToken: response.user.refreshToken,
            userId: response.user.uid,
            // expirationDate: expirationDate,
            userEmail: response.user.email
          });
          commit("SET_USER_DATA", {
            userBusinessName: null,
            userFirstName: firstName,
            userLastName: lastName,
            userProStatus: userProStatus
          });
          router.push("./dashboard");
        })
        .catch(err => console.log(err));
    },
    signupPro({ commit }, authData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(response => {
          // console.log(commit);
          // console.log(response);
          console.log(response.user.uid);
          console.log(authData);
          const createdAt = new Date();
          const businessName = authData.businessName;
          const firstName = authData.firstName;
          const lastName = authData.lastName;
          const userProStatus = true;
          db.collection("pros")
            .doc(response.user.uid)
            .set({
              createdAt,
              businessName,
              firstName,
              lastName,
              userProStatus
            });
          commit("LOGIN", {
            refreshToken: response.user.refreshToken,
            userId: response.user.uid,
            // expirationDate: expirationDate,
            userEmail: response.user.email
          });
          commit("SET_USER_DATA", {
            userBusinessName: businessName,
            userFirstName: firstName,
            userLastName: lastName,
            userProStatus: userProStatus
          });
          router.push("./dashboard");
        })
        .catch(err => console.log(err));
    }
  },
  getters: {
    // partially implemented-- look into real user session auth
    loggedIn: state => !!state.refreshToken,
    getHomeImages: state => state.homeImages,
    userBusinessName: state => state.userBusinessName,
    userFirstName: state => state.userFirstName,
    userLastName: state => state.userLastName,
    userProStatus: state => state.userProStatus
  }
});
