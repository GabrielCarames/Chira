import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAe3AbjWZ4O6D5Q1WprYj47moX9IaF-o4",
  authDomain: "chira-199ce.firebaseapp.com",
  projectId: "chira-199ce",
  storageBucket: "chira-199ce.appspot.com",
  messagingSenderId: "421563002410",
  appId: "1:421563002410:web:c5f07a699fddb42c25dd53",
  measurementId: "G-54KK31S0NE",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
