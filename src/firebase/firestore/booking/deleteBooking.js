import { db } from '../../config';

const deleteBooking = async (id) => {
  try {
    const docRef = db.collection('users').doc(id);
    const response = db.collection('booking').where('user_id', '==', docRef);
    const docs = await response.get();
    if (docs.empty) {
      throw new Error('No such document!');
    }
    docs.forEach((doc) => {
      doc.ref.delete();
    });
    return { msg: 'booking deleted successfully' };
  } catch (err) {
    return err;
  }
};

export default deleteBooking;
