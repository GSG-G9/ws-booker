import { db } from '../../config';

const getBookingByUserId = async (userId) => {
  try {
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
