// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkrlZLMrnqtMBR0Jj_MfnFGBXUr-Uuf40",
  authDomain: "app-eplano.firebaseapp.com",
  projectId: "app-eplano",
  storageBucket: "app-eplano.appspot.com",
  messagingSenderId: "692444969276",
  appId: "1:692444969276:web:3050c0111d79aa40d20639",
  measurementId: "G-QD9GRJV798"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);  
const auth = getAuth();

// Configure a autenticação para permitir múltiplos métodos
updateProfile(auth.currentUser, { allowMultipleAccounts: true });

export default firebaseApp;