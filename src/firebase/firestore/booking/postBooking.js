import firebase from 'firebase';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { db } from '../../config';
import { bookingSchema } from '../../../utils/validation';
import { getWorkspaceById } from '../workspace/index';

const postBooking = async (user_id, workspace_id, payload) => {
  const moment = extendMoment(Moment);

  getWorkspaceById(workspace_id)
    .then((data) => {
      const wsWorkingTime = {
        startTime: data.start_time.toDate().toLocaleTimeString(),
        endTime: data.end_time.toDate().toLocaleTimeString(),
        dayOfWork: data.days_of_work,
      };
      console.log('end', data.start_time.toDate());
      console.log(wsWorkingTime);
      return wsWorkingTime;
    })
    .catch((err) => console.log(err));
  const start = moment('2018-01-25 17:05:33');
  const end = moment('2018-01-28 06:10:00');
  const Cstart = moment('2018-05-26 17:05:33');
  const Cend = moment('2018-10-30 06:10:00');
  const range1 = moment.range(start, end);
  const range2 = moment.range(Cstart, Cend);
  console.log('range', range1.overlaps(range2));

  const payloadObj = {
    book_capacity: payload.book_capacity,
    book_start_time: payload.book_start_time,
    book_end_time: payload.book_end_time,
  };
  console.log('payloadObj', payloadObj.book_start_time);

  try {
    const {
      book_capacity,
      book_start_time,
      book_end_time,
    } = await bookingSchema.validate(payloadObj);
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
