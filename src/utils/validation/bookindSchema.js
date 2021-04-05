import { object, number, string, array } from 'yup';

const postBookingSchema = object({
  book_capacity: number().required(),
  days_of_work: array().of(number()).required(),
  start_time: string().required(),
  end_time: string().required(),
});

export default postBookingSchema;
