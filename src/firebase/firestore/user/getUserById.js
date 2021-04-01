import { db } from '../../config';

const getUserById = async (id) => {
  try {
    const response = db.collection('users').doc(id);
    const doc = await response.get();
    if (!doc.exists) {
      throw new Error('No such document!');
    }
    return doc.data();
  } catch (err) {
    return err;
  }
};

export default getUserById;
