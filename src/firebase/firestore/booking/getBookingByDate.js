import firebase from 'firebase';
import Moment from 'moment';
import { db } from '../../config';

const getBookingByDate = async (workspaceId, startDate, endDate) => {
  try {
    const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
      new Date(endDate)
    );
    const millisecondsStartTime = firebase.firestore.Timestamp.fromDate(
      new Date(startDate)
    );
    console.log(millisecondsStartTime.toDate(), millisecondsEndTime.toDate());
    const docRef = db.collection('workspaces').doc(workspaceId);
    const response1 = db
      .collection('booking')
      .where('workspace_id', '==', docRef)
      .where('book_start_time', '<=', millisecondsEndTime.toDate())
      .get();

    const response2 = db
      .collection('booking')
      .where('workspace_id', '==', docRef)
      .where('book_end_time', '>=', millisecondsStartTime.toDate())
      .get();
    const [startTime, endTime] = await Promise.all([response1, response2]);

    const allDataStart = startTime.docs.map((doc) => {
      const data = doc.data();
      const { id } = doc;
      return { id, ...data };
    });

    const allDataEnd = endTime.docs.map((doc) => {
      const data = doc.data();
      const { id } = doc;
      return { id, ...data };
    });

    const commonBooking = allDataStart.filter((o1) =>
      allDataEnd.some((o2) => o1.id === o2.id)
    );
    console.log('firrrst', allDataStart);
    console.log('second', allDataEnd);
    console.log('finallll', commonBooking);

    return commonBooking;
  } catch (err) {
    return err;
  }
};

export default getBookingByDate;
