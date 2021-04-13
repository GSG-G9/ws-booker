import firebase from 'firebase';
import { db } from '../../config';
import { getWorkspaceById } from '../workspace';

const getBookingByDate = async (workspaceId, startDate, endDate) => {
  try {
    const isWorkspace = await getWorkspaceById(workspaceId);
    if (isWorkspace instanceof Error) {
      throw new Error('This workspace is not exist');
    }
    const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
      new Date(endDate)
    );
    const millisecondsStartTime = firebase.firestore.Timestamp.fromDate(
      new Date(startDate)
    );
    const docRef = db.collection('workspaces').doc(workspaceId);

    const getResponse = (first, operator, second) =>
      db
        .collection('booking')
        .where('workspace_id', '==', docRef)
        .where(first, operator, second)
        .get();

    const response1 = getResponse(
      'book_start_time',
      '<=',
      millisecondsEndTime.toDate()
    );

    const response2 = getResponse(
      'book_end_time',
      '>=',
      millisecondsStartTime.toDate()
    );
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
    return commonBooking;
  } catch (err) {
    return err;
  }
};

export default getBookingByDate;
