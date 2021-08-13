import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAz7U2T6Gi5syk9CneKyI51NBLzBKG8j9M",
    authDomain: "crud-react-udemy-39484.firebaseapp.com",
    projectId: "crud-react-udemy-39484",
    storageBucket: "crud-react-udemy-39484.appspot.com",
    messagingSenderId: "78383210351",
    appId: "1:78383210351:web:8f503fd0d257807a60529a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export { firebase }