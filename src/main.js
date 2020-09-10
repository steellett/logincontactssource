import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const axios = require("axios");
Vue.use(Vuelidate);

const firebaseConfig = {
    apiKey: "AIzaSyCw3CEHFR4IUh5MwYwgXl-6eywvYITIxyw",
    authDomain: "loginapp-2d025.firebaseapp.com",
    databaseURL: "https://loginapp-2d025.firebaseio.com",
    projectId: "loginapp-2d025",
    storageBucket: "loginapp-2d025.appspot.com",
    messagingSenderId: "937196677059",
    appId: "1:937196677059:web:d6d366b649af32c7d47f76",
    measurementId: "G-WT919XT9N3",
};

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            axios,
            router,
            store,
            vuetify,
            render: (h) => h(App),
        }).$mount("#app");
    }
});