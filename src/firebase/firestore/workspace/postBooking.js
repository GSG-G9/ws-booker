import { db } from '../../config';
import postBookingSchema from '../../../utils/validation';

const postBooking = async (user_id, workspace_id, payload) => {
  const payloadObj = {
    book_capacity: payload.book_capacity,
    days_of_work: payload.days_of_work,
    start_time: payload.start_time,
    end_time: payload.end_time,
  };

  try {
    const {
      book_capacity,
      days_of_work,
      start_time,
      end_time,
    } = await postBookingSchema.validate(payloadObj);
    const bookindCollection = db.collection('booking');
    bookindCollection.add({
      user_id,
      workspace_id,
      book_capacity,
      days_of_work,
      start_time,
      end_time,
    });
    return {
      data: await (await bookindCollection.get()).metadata(),
      message: 'booking added successfully',
    };
  } catch (err) {
    return err;
  }
};

export default postBooking;
