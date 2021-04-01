import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDLwxtNQ9rMLmHU62qoYBf3xPzo53VDu3s',
  authDomain: 'ws-booker-af584.firebaseapp.com',
  projectId: 'ws-booker-af584',
  storageBucket: 'ws-booker-af584.appspot.com',
  messagingSenderId: '554004110030',
  appId: '1:554004110030:web:48e55e3ca80a602b4bce9f',
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
