import firebase from 'firebase';
import { db } from '../../config';

const addBooking = async (
  userId,
  workspaceId,
  bookCapacity,
  bookStartTime,
  bookEndTime
) => {
  try {
    const millisecondsStartTime = firebase.firestore.Timestamp.fromDate(
      new Date(bookStartTime)
    );
    const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
      new Date(bookEndTime)
    );
    const bookingCollection = await db.collection('booking');
    bookingCollection.add({
      user_id: db.doc(`users/${userId}`),
      workspace_id: db.doc(`workspaces/${workspaceId}`),
      book_capacity: bookCapacity,
      book_start_time: millisecondsStartTime.toDate(),
      book_end_time: millisecondsEndTime.toDate(),
    });
    return { message: 'booking added successfully' };
  } catch (err) {
    return err;
  }
};

export default addBooking;
