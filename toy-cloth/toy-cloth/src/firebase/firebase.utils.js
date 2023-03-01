import { initializeApp } from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { signInWithPopup } from 'firebase/auth';

 
const firebaseConfig = {
    apiKey: "AIzaSyC65muqzdRcs6D_AfhZx_mj3bLhhyPUCJ4",
    authDomain: "toyman-db.firebaseapp.com",
    projectId: "toyman-db",
    storageBucket: "toyman-db.appspot.com",
    messagingSenderId: "974675889668",
    appId: "1:974675889668:web:79c058fda144c16324af51",
    measurementId: "G-7Q17Y57K37"
};
 //  const docRef = doc (firestore, 'users/udg837e87eysb' );
  //  const docSnap = await getDoc (docRef);
  //     console.log(docSnap);
     
export const createUserProfileDocument =  async (
    userAuth, additionalData ) => {
    if (!userAuth) return;
 
    const userRef = doc(firestore, 'users',`${userAuth.uid}`  );
  
    const userSnapshot = await getDoc(userRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(doc(userRef, 'users', 'data' ), {
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userRef;
  };
const app = initializeApp(firebaseConfig);
    
  export const auth = getAuth(app);
    export const firestore = getFirestore(app);

    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({prompt : 'select_account'});
     export const signInWithGoogle = ()=> signInWithPopup(auth, provider);

     export default app;

     