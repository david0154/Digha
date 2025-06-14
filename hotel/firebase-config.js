// hotel/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyB9SGeSzQSP63szOYyzEFCd9-f26KRNA5I",
  authDomain: "dk-chats-2919c.firebaseapp.com",
  databaseURL: "https://dk-chats-2919c-default-rtdb.firebaseio.com",
  projectId: "dk-chats-2919c",
  storageBucket: "dk-chats-2919c.appspot.com",
  messagingSenderId: "620357656811",
  appId: "1:620357656811:web:ee4ada3c2e8baa0d679eae",
  measurementId: "G-XHS1E7PRKL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
