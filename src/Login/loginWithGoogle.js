import firebase from 'firebase';
// import addUser from '../firebase/addUser';

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  firebase.auth().signInWithPopup(provider);
  // .then((authResult) => {
  //   const { user } = authResult;
  //   addUser(user)
  //     .then((res) => console.log(8, res))
  //     .catch((e) => console.log(8, e));
  // });
};

export default loginWithGoogle;
