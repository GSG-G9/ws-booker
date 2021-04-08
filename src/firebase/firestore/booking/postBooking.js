import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { bookingSchema } from '../../../utils/validation';
import getBookingByDate from './getBookingByDate';
import addBooking from './addBooking';
import { checkOverlap } from '../../../utils';

const moment = extendMoment(Moment);
let isOverlapped = false;
let message;

const postBooking = async (userId, workspaceId, payload) => {
  try {
    const {
      book_capacity: bookCapacity,
      book_start_time: bookStartTime,
      book_end_time: bookEndTime,
    } = await bookingSchema.validate(payload);

    const overlappedBookings = await getBookingByDate(
      workspaceId,
      bookStartTime,
      bookEndTime
    );

    console.log(overlappedBookings);

    if (overlappedBookings.length) {
      const bookingsTimes = overlappedBookings.map(
        ({ book_start_time: startTime, book_end_time: endTime }) => [
          moment(startTime.toDate()).format('HH:mm:ss'),
          moment(endTime.toDate()).format('HH:mm:ss'),
        ]
      );
      const newBookingTimeRange = [
        moment(bookStartTime).format('HH:mm:ss'),
        moment(bookEndTime).format('HH:mm:ss'),
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
    const bookingResult = await addBooking(
      userId,
      workspaceId,
      bookCapacity,
      bookStartTime,
      bookEndTime
    );
    return bookingResult;
  } catch (err) {
    return err;
  }
};

// get array of new booking days
// const bookingStartDay = moment(book_start_time).format('ddd MMM DD YYYY');
// const bookingEndDay = moment(book_end_time).format('ddd MMM DD YYYY');
// console.log('dayyyyy', bookingStartDay, bookingEndDay);
// const daysRange = moment.range(book_start_time, book_end_time);
// const days = Array.from(daysRange.by('day'));
// const bookingDays = days.map((m) => m.format('ddd MMM DD YYYY'));
// console.log(bookingDays);
export default postBooking;
