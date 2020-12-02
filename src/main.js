import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";
import 'firebase/firestore';

import Modal from './components/Modal'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1eHZDMuwCnKuXdhiyoklRudPEOzkHaL8",
  authDomain: "app-fitness-eed0c.firebaseapp.com",
  databaseURL: "https://app-fitness-eed0c.firebaseio.com",
  projectId: "app-fitness-eed0c",
  storageBucket: "app-fitness-eed0c.appspot.com",
  messagingSenderId: "298275420976",
  appId: "1:298275420976:web:b86823df1543b3a6b666f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false;
// Register global component
Vue.component("Modal", Modal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
