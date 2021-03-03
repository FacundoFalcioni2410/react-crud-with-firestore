import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDyH9QrboT_TERVSGpdhuTEpZld1lq1kvw",
  authDomain: "fir-firestore-971c3.firebaseapp.com",
  projectId: "fir-firestore-971c3",
  storageBucket: "fir-firestore-971c3.appspot.com",
  messagingSenderId: "561553137768",
  appId: "1:561553137768:web:b2f14f03801eb4f922dbdd"
};
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const db = fire.firestore();

  export  {db};