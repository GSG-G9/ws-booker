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

    console.log(getBookings[1].book_end_time);
    console.log(moment(getBookings[0].book_end_time).format());

    const milliseconds = firebase.firestore.Timestamp.fromDate(
      new Date(getBookings[1].book_end_time)
    );
    console.log(milliseconds.toDate());

    // const bookingsTimes = getBookings.map(
    //   ({ book_start_time, book_end_time }) => {
    //     let convertedTime;
    //     if (!book_start_time.seconds) {
    //       const millisecondsTime = firebase.firestore.Timestamp.fromDate(
    //         new Date(book_start_time)
    //       );
    //       return millisecondsTime.toDate();
    //     }
    //     return book_start_time.toDate();

    //     // console.log({ book_start_time, book_end_time });
    //     // return [book_start_time, book_end_time];
    //   }
    // );

    // const bookingsTimes = getBookings.map(
    //   ({ book_start_time, book_end_time }) => {
    //     console.log({ book_start_time, book_end_time });
    //     return {
    //       startTime: book_start_time.toDate(),
    //       endTime: book_end_time.toDate(),
    //     };
    //   }
    // );

    // const timeRanges = bookingsTimes.map(({ startTime, endTime }) =>
    //   moment.range(startTime, endTime)
    // );

    // console.log('timmmmmmm', bookingsTimes);
    // console.log('ranggggg', timeRanges);

    const millisecondsStartTime = firebase.firestore.Timestamp.fromDate(
      new Date(book_start_time)
    );
    const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
      new Date(book_end_time)
    );

    console.log('original', book_start_time);

    // const range1 = moment.range(
    //   'Thu Apr 08 2021 14:00:00 GMT+0300 (Israel Daylight Time)',
    //   'Thu Apr 08 2021 16:00:00 GMT+0300 (Israel Daylight Time)'
    // );
    // const range2 = moment.range(
    //   'Apr 7 2021 10:00:00',
    //   'Thu Apr 11 2021 12:00:00'
    // );
    // console.log('okkkk', range1.overlaps(range2));

    const newBookingStartDay = moment(book_start_time).format(
      'ddd MMM DD YYYY'
    );
    const newBookingEndDay = moment(book_end_time).format('ddd MMM DD YYYY');
    console.log('compare', newBookingStartDay, newBookingEndDay);
    if (newBookingStartDay === newBookingEndDay) {
      const newBookingRange = moment.range(book_start_time, book_end_time);
      console.log('newww', newBookingRange);
      timeRanges.forEach((item) => {
        if (item.overlaps(newBookingRange)) {
          console.log(`sorry, the date ${item} is already booked`);
        }
      });
    }

    const bookingStartDay = moment(book_start_time).format('ddd MMM DD YYYY');
    const bookingEndDay = moment(book_end_time).format('ddd MMM DD YYYY');
    console.log('dayyyyy', bookingStartDay, bookingEndDay);

    const daysRange = moment.range(book_start_time, book_end_time);
    const days = Array.from(daysRange.by('day'));
    const bookingDays = days.map((m) => m.format('ddd MMM DD YYYY'));
    console.log(bookingDays);

    const { start_time, end_time, days_of_work } = await getWorkspaceById(
      workspace_id
    );
    const wsWorkingTime = {
      startTime: start_time.toDate(),
      endTime: end_time,
      // .toDate().toLocaleTimeString(),
      dayOfWork: days_of_work,
    };
    console.log(wsWorkingTime);

    // Wed Mar 31 2021 09:00:00 GMT+0300 (Israel Daylight Time)

    // console.log(
    //   'hiiii',
    //   wsWorkingTime.startTime,
    //   wsWorkingTime.start_time.toDate().toLocaleTimeString()
    // );

    const bookingCollection = db.collection('booking');
    bookingCollection.add({
      user_id: db.doc(`users/${user_id}`),
      workspace_id: db.doc(`workspaces/${workspace_id}`),
      book_capacity,
      book_start_time: millisecondsStartTime.toDate(),
      book_end_time: millisecondsEndTime.toDate(),
    });
    return { message: 'booking added successfully' };
  } catch (err) {
    return err;
  }
};

export default postBooking;
