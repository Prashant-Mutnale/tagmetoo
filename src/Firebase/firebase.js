import * as Firebase from "firebase";

var config = {
  apiKey: "AIzaSyDHY1t3LydpDovH5UgGl_RG-lll5wkbtPY",
  authDomain: "tagmetoo-2b903.firebaseapp.com",
  databaseURL: "https://tagmetoo-2b903.firebaseio.com",
  projectId: "tagmetoo-2b903",
  storageBucket: "tagmetoo-2b903.appspot.com",
  messagingSenderId: "950172593241"
};

export const firebaseRef = !Firebase.apps.length
  ? Firebase.initializeApp(config)
  : Firebase.app();
