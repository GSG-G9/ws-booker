import firebase from 'firebase';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { db } from '../../config';
import { bookingSchema } from '../../../utils/validation';
import { getWorkspaceById } from '../workspace/index';
import getBookingByWorkspaceId from './getBookingByWorkspaceId';
import getBookingByDate from './getBookingByDate';
import { checkOverlap } from '../../../utils';

const moment = extendMoment(Moment);
let isOverlapped = false;
let message;

const postBooking = async (userId, workspaceId, payload) => {
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

    const overlappedBookings = await getBookingByDate(
      workspaceId,
      book_start_time,
      book_end_time
    );
    console.log(overlappedBookings);

    if (overlappedBookings.length) {
      const bookingsTimes = overlappedBookings.map(
        ({ book_start_time, book_end_time }) => [
          moment(book_start_time.toDate()).format('HH:mm:ss'),
          moment(book_end_time.toDate()).format('HH:mm:ss'),
        ]
      );

      const newBookingTimeRange = [
        moment(book_start_time).format('HH:mm:ss'),
        moment(book_end_time).format('HH:mm:ss'),
      ];

      bookingsTimes.forEach((range) => {
        if (checkOverlap([range, newBookingTimeRange])) {
          message = `sorry, the date ${range} is already booked`;
          isOverlapped = true;
        }
      });

      console.log('timmmmmmm', bookingsTimes);
      console.log('newwww ranggggg', newBookingTimeRange);
      console.log('resultt overlap', isOverlapped);
    }
    if (isOverlapped) {
      return message;
    }
    const millisecondsStartTime = firebase.firestore.Timestamp.fromDate(
      new Date(book_start_time)
    );
    const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
      new Date(book_end_time)
    );
    const bookingCollection = await db.collection('booking');
    bookingCollection.add({
      user_id: db.doc(`users/${userId}`),
      workspace_id: db.doc(`workspaces/${workspaceId}`),
      book_capacity,
      book_start_time: millisecondsStartTime.toDate(),
      book_end_time: millisecondsEndTime.toDate(),
    });
    return { message: 'booking added successfully' };
  } catch (err) {
    return err;
  }
};
// const newBookingStartDay = moment(book_start_time).format(
//   'ddd MMM DD YYYY'
// );
// const newBookingEndDay = moment(book_end_time).format('ddd MMM DD YYYY');
// console.log('compare', newBookingStartDay, newBookingEndDay);
// if (newBookingStartDay === newBookingEndDay) {
//   const newBookingRange = moment.range(book_start_time, book_end_time);
//   console.log('newww', newBookingRange);
//   timeRanges.forEach((item) => {
//     if (item.overlaps(newBookingRange)) {
//       console.log(`sorry, the date ${item} is already booked`);
//     }
//   });
// }

// const bookingStartDay = moment(book_start_time).format('ddd MMM DD YYYY');
// const bookingEndDay = moment(book_end_time).format('ddd MMM DD YYYY');
// console.log('dayyyyy', bookingStartDay, bookingEndDay);

// const daysRange = moment.range(book_start_time, book_end_time);
// const days = Array.from(daysRange.by('day'));
// const bookingDays = days.map((m) => m.format('ddd MMM DD YYYY'));
// console.log(bookingDays);

// const { start_time, end_time, days_of_work } = await getWorkspaceById(
//   workspace_id
// );
// const wsWorkingTime = {
//   startTime: start_time.toDate(),
//   endTime: end_time,
//   .toDate().toLocaleTimeString(),
//   dayOfWork: days_of_work,
// };
// console.log(wsWorkingTime);

// Wed Mar 31 2021 09:00:00 GMT+0300 (Israel Daylight Time)

// console.log(
//   'hiiii',
//   wsWorkingTime.startTime,
//   wsWorkingTime.start_time.toDate().toLocaleTimeString()
// );
export default postBooking;
