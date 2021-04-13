import { db } from '../../config';
import { getUserById } from '../user';

const getBookingByUserId = async (userId) => {
  try {
    const isUser = await getUserById(userId);
    if (isUser instanceof Error) {
      throw new Error('No such document!');
    }
    const docRef = db.collection('users').doc(userId);
    const response = db.collection('booking').where('user_id', '==', docRef);
    const data = await response.get();
    if (!data) {
      return new Error('No data returned!');
    }
    const result = data.docs.map((doc) => doc.data());
    return result[0];
  } catch (err) {
    return err;
  }
};

export default getBookingByUserId;
