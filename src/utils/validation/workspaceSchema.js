import { object, number, string, array } from 'yup';

const addWorkspaceSchema = object({
  name: string().required(),
  description: string().required(),
  days_of_work: array().of(number()).required(),
  start_time: string().required(),
  end_time: string().required(),
  fees_per_hour: number().required(),
  fees_per_day: number().required(),
  capacity: number().required(),
  location: string().required(),
  amenities: array().of(string()).required(),
  city: string().required(),
  header_image: string().required(),
  image_gallery: array().of(string()).required(),
  rating: number().required(),
  reviewers_number: number().required(),
});

export default addWorkspaceSchema;