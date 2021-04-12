import { db } from '../../config';
import { getUserById } from '../user';

const deleteBooking = async (id) => {
  try {
    const isUser = await getUserById(id);
    if (isUser instanceof Error) {
      throw new Error('This user is not exist');
    }
    const batch = db.batch();
    const docRef = db.collection('users').doc(id);
    const response = db.collection('booking').where('user_id', '==', docRef);
    const docs = await response.get();
    if (docs.empty) {
      throw new Error('No matching documents.');
    }
    docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return { msg: 'booking deleted successfully' };
  } catch (err) {
    return err;
  }
};

export default deleteBooking;
