import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,FacebookAuthProvider} from "firebase/auth";

export const initializeLoginFramework = () => {
  initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
  const goggleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, goggleProvider)
  .then(result => {
    const {displayName, photoURL, email} = result.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
      success: true,
    }
    return signedInUser;
    //console.log(displayName, photoURL, email);
  })
  .catch(error => {
    console.error(error);
    console.log(error.message);
  })
}

export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, fbProvider)
    .then((result) => {
      let user = result.user;
      user.success = true;
      return user;
      // console.log(user)
    })
    .catch((error) => {
      console.log(error)
    });
}


export const handleSignOut = () =>{
  const auth = getAuth();
  return signOut(auth)
  .then(result => {
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
      error: '',
      success: false,
    }
    return signedOutUser;
  })
  .catch(error => {

  })
}

export const userCreateWithEmailAndPassword = (name, email, password) => {
      const auth = getAuth();
      return createUserWithEmailAndPassword(auth, email, password)
     .then(res => {
       const newUserInfo =res.user;
       newUserInfo.error = '';
       newUserInfo.success = true;
       updateUserProfile(name);
       return newUserInfo;
     })
     .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      });
}

export const signWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const newUserInfo =res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
        //console.log(res.user);
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}

const updateUserProfile = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error)
  });
}