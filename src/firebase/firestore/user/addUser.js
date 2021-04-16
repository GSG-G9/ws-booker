import { db } from '../../config';

const addUser = async (user) => {
  try {
    const response = db.collection('users').doc(user.uid);
    const doc = await response.get();
    if (!doc.exists) {
      await response.set({
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        phone_number: user.phoneNumber,
        can_book: true,
      });
      return { message: 'User added successfully' };
    }
    return { message: 'User already exists' };
  } catch (err) {
    return err;
  }
};

export default addUser;
