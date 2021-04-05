import firebase from 'firebase';
import addUser from '../firebase/firestore/user/addUser';

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((authResult) => {
      const { user } = authResult;
      addUser(user).then((res) => res);
    })
    .catch((error) => error);
};

export default loginWithGoogle;
