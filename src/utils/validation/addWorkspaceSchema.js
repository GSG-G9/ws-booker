import { object, number, string, array } from 'yup';

const addWorkspaceSchema = object({
  name: string(),
  description: string(),
  days_of_work: array().of(number()),
  start_time: string(),
  end_time: string(),
  fees_per_hour: number(),
  fees_per_day: number(),
  capacity: number(),
  location: string(),
  amenities: array().of(string()),
  city: string(),
  header_image: string(),
  image_gallery: array().of(string()),
  rating: number(),
  reviewers_number: number(),
});

export default addWorkspaceSchema;
