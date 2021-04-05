import { db } from '../../config';

const addUser = async (user) => {
  try {
    const response = db.collection('users').doc(user.uid);
    const doc = await response.get();
    if (!doc.exists) {
      doc.set({
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        phone_number: user.phoneNumber,
      });
    }
    return doc.data();
  } catch (err) {
    return err;
  }
};

export default addUser;
