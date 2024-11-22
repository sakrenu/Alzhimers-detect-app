// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth} from 'firebase/auth';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCGPJeG530wasjDq634rug8EGH9xRh7u9M",
//   authDomain: "aih-alz-detect.firebaseapp.com",
//   projectId: "aih-alz-detect",
//   storageBucket: "aih-alz-detect.firebasestorage.app",
//   messagingSenderId: "951947844576",
//   appId: "1:951947844576:web:4a19c1a0c117688b6d2985",
//   measurementId: "G-BZFBP9XFMC"
// };

// // Initialize Firebase


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

//--getting the dashboards done - 
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGPJeG530wasjDq634rug8EGH9xRh7u9M",
  authDomain: "aih-alz-detect.firebaseapp.com",
  projectId: "aih-alz-detect",
  storageBucket: "aih-alz-detect.firebasestorage.app",
  messagingSenderId: "951947844576",
  appId: "1:951947844576:web:4a19c1a0c117688b6d2985",
  measurementId: "G-BZFBP9XFMC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);