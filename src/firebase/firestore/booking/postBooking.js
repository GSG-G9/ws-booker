import firebase from 'firebase';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { db } from '../../config';
import { bookingSchema } from '../../../utils/validation';
import { getWorkspaceById } from '../workspace/index';
import getBookingByWorkspaceId from './getBookingByWorkspaceId';

const moment = extendMoment(Moment);

const postBooking = async (user_id, workspace_id, payload) => {
  try {
    const payloadObj = {
      book_capacity: payload.book_capacity,
      book_start_time: payload.book_start_time,
      book_end_time: payload.book_end_time,
    };

    const {
      book_capacity,
      book_start_time,
      book_end_time,
    } = await bookingSchema.validate(payloadObj);

    const getBookings = await getBookingByWorkspaceId(workspace_id);
    console.log('getBookings', getBookings);

    getBookings.map(({ book_start_time, book_end_time }) => {
      console.log({ book_start_time, book_end_time });
      return [book_start_time, book_end_time];
    });

    // const bookingStartDay = moment(book_start_time).format('ddd');
    // const bookingEndDay = moment(book_end_time).format('ddd');
    // console.log('dayyyyy', bookingStartDay, bookingEndDay);

    // const daysRange = moment.range(book_start_time, book_end_time);
    // const days = Array.from(daysRange.by('day'));
    // const bookingDays = days.map((m) => m.format('ddd'));

    const { start_time, end_time, days_of_work } = await getWorkspaceById(
      workspace_id
    );
    const wsWorkingTime = {
      startTime: start_time.toDate().toLocaleTimeString(),
      endTime: end_time.toDate().toLocaleTimeString(),
      dayOfWork: days_of_work,
    };

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
