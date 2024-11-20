import { initializeApp } from "firebase/app";
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDGKqqGYQCF63Wogx0its44zg3fn1gZL24",
  authDomain: "react-native-todo-app-650b6.firebaseapp.com",
  projectId: "react-native-todo-app-650b6",
  storageBucket: "react-native-todo-app-650b6.firebasestorage.app",
  messagingSenderId: "746272133355",
  appId: "1:746272133355:web:0dd0e960aa9b4ea0d56eae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 
