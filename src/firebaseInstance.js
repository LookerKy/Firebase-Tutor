import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

/* .env를 하는 것은 보안을 위한 부분이 아닌 github에서 감추기 위해서 하는 것 build를 하게되면 결국 실제값이 들어가게됨. */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig)

export const firebaseInstance = firebase

export const AuthService = firebase.auth()