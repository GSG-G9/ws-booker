import { object, number, string } from 'yup';

const bookingSchema = object({
  book_capacity: number().required(),
  book_start_time: string().required(),
  book_end_time: string().required(),
});

export default bookingSchema;
