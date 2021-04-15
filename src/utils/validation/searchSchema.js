import { object, number, string } from 'yup';

const searchSchema = object({
  q: string().nullable(),
  city: string().nullable(),
  capacity: number().positive().nullable(),
});

export default searchSchema;
