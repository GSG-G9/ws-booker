import { db } from '../../config';

const getUserById = async (id) => {
  try {
    const response = await db.collection('users').doc(id).get();
    if (!response.exists) {
      throw new Error('No such document!');
    }
    return response.data();
  } catch (err) {
    return err;
  }
};

export default getUserById;
