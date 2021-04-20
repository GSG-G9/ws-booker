import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { bookingSchema } from '../../../utils/validation';
import getBookingByDate from './getBookingByDate';
import addBooking from './addBooking';
import { getWorkspaceById } from '../workspace';
import { getUserById } from '../user';
import { checkOverlap } from '../../../utils';

const moment = extendMoment(Moment);

const postBooking = async (userId, workspaceId, payload) => {
  let isOverlapped = false;
  let message;
  try {
    const isWorkspace = await getWorkspaceById(workspaceId);
    if (isWorkspace instanceof Error) {
      throw new Error('This workspace is not exist post');
    }
    const { capacity } = isWorkspace;
    console.log('capacityyy', capacity);
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
    console.log(overlappedBookings);
    if (!overlappedBookings.length) {
      isOverlapped = false;
      message = '';
    } else {
      const bookingsDates = overlappedBookings.map(
        ({ book_start_time: startTime, book_end_time: endTime }) => [
          moment(startTime.toDate()).format('ddd MMM DD YYYY HH:mm:ss'),
          moment(endTime.toDate()).format('ddd MMM DD YYYY HH:mm:ss'),
        ]
      );
      console.log('datesss', bookingsDates);
      const dateTimeArray = [];
      bookingsDates.forEach((item) => {
        const start = moment(item[0]).format('HH:mm:ss');
        const end = moment(item[1]).format('HH:mm:ss');
        const daysRange = moment.range(item[0], item[1]);
        const days = Array.from(daysRange.by('day'));
        const bookingDays = days.map((m) => m.format('ddd MMM DD YYYY'));
        const dateTimeObject = { time: [start, end], dates: bookingDays };
        dateTimeArray.push(dateTimeObject);
      });
      console.log(dateTimeArray);

      const daysRange = moment.range(bookStartTime, bookEndTime);
      const days = Array.from(daysRange.by('day'));
      const newBookingDays = days.map((m) => m.format('ddd MMM DD YYYY'));

      const newBookingTimeRange = [
        moment(bookStartTime).format('HH:mm:ss'),
        moment(bookEndTime).format('HH:mm:ss'),
      ];
      const overlappedTimeBooking = [];
      dateTimeArray.forEach((range) => {
        if (checkOverlap([range.time, newBookingTimeRange])) {
          overlappedTimeBooking.push(range);
        }
      });
      console.log('filterrred', overlappedTimeBooking);
      if (!overlappedTimeBooking.length) {
        isOverlapped = false;
        message = '';
      } else {
        const daysCapacity = [];
        newBookingDays.forEach((newItem) => {
          let count = 0;
          overlappedTimeBooking.forEach((item) => {
            if (item.dates.includes(newItem)) {
              count += 1;
            }
          });
          daysCapacity.push({ date: newItem, repeat: count });
        });
        console.log(daysCapacity);
        const maxDayRepeat = daysCapacity.reduce((max, obj) =>
          max.repeat > obj.repeat ? max : obj
        );
        console.log(maxDayRepeat);
        if (maxDayRepeat.repeat >= capacity) {
          message = `Sorry, the date  ${maxDayRepeat.date} is full at this time`;
          isOverlapped = true;
          console.log('trueeeeee');
        }
      }
    }
    if (isOverlapped) {
      return {
        succeed: false,
        msg: message,
      };
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
