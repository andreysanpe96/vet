import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyATpv_szd49x7P9bWQbpwJ2pLZV545WysM",
    authDomain: "vetfirebase-6097d.firebaseapp.com",
    projectId: "vetfirebase-6097d",
    storageBucket: "vetfirebase-6097d.appspot.com",
    messagingSenderId: "1004750868806",
    appId: "1:1004750868806:web:2fe9e9c1cf8637d52a5547"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)