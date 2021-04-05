import { db } from '../../config';
import postBookingSchema from '../../../utils/validation';

const postBooking = async (user_id, workspace_id, payload) => {
  const payloadObj = {
    book_capacity: payload.book_capacity,
    book_start_time: payload.book_start_time,
    book_end_time: payload.book_end_time,
  };

  try {
    const {
      book_capacity,
      book_start_time,
      book_end_time,
    } = await postBookingSchema.validate(payloadObj);
    const bookingCollection = db.collection('booking');
    bookingCollection.add({
      user_id: db.doc(`users/${user_id}`),
      workspace_id: db.doc(`workspaces/${workspace_id}`),
      book_capacity,
      book_start_time,
      book_end_time,
    });
    return { message: 'booking added successfully' };
  } catch (err) {
    return err;
  }
};

export default postBooking;
