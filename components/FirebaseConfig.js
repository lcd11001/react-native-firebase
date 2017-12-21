import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS9b-ds_k_PVmfbPIN4Ogb6GAHNaQ-w0M",
    authDomain: "reactnative-firebase-5d0f5.firebaseapp.com",
    databaseURL: "https://reactnative-firebase-5d0f5.firebaseio.com",
    projectId: "reactnative-firebase-5d0f5",
    storageBucket: "reactnative-firebase-5d0f5.appspot.com",
    messagingSenderId: "849516217141"
};
export const firebaseApp = firebase.initializeApp(config);
