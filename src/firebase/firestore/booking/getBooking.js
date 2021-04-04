import { db } from '../../config';

const getBookingByUserId = async (userId) => {
  try {
    const response = await db.collection('booking').doc(userId).get();
    if (!response.exists) {
      throw new Error('No such document!');
    }
    return response.data();
  } catch (err) {
    return err;
  }
};

export default getBookingByUserId;
