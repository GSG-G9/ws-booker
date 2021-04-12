import firebase from 'firebase';
import addUser from '../firebase/firestore/user/addUser';

const loginWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const { user } = await firebase.auth().signInWithPopup(provider);

    const addedUser = await addUser(user);
    return addedUser;
  } catch (error) {
    return error;
  }
};

export default loginWithGoogle;
