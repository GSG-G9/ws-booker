import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { bookingSchema } from '../../../utils/validation';
import getBookingByDate from './getBookingByDate';
import addBooking from './addBooking';
import { getWorkspaceById } from '../workspace';
import { getUserById } from '../user';
import { checkOverlap } from '../../../utils';

const moment = extendMoment(Moment);
let isOverlapped = false;
let message;

const postBooking = async (userId, workspaceId, payload) => {
  try {
    const isWorkspace = await getWorkspaceById(workspaceId);
    if (isWorkspace instanceof Error) {
      throw new Error('This workspace is not exist post');
    }
    const isUser = await getUserById(userId);
    if (isUser instanceof Error) {
      throw new Error('This user is not exist post');
    }
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
    if (!overlappedBookings.length) {
      isOverlapped = false;
    } else {
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
          message = `Sorry, the time range ${range} is already booked at this date`;
          isOverlapped = true;
        }
      });
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

export default postBooking;
