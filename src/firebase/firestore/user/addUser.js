import { db } from '../../config';

const addUser = async (user) => {
  try {
    const doc = await db.collection('users').doc(user.uid).get();
    if (doc.exists) {
      console.log('already here');
    } else {
      doc.set({
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        phone_number: user.phoneNumber,
      });
      console.log('Document successfully written!');
    }
    return doc.data();
  } catch (err) {
    console.error('Error writing document: ', err);
    return err;
  }
};

export default addUser;