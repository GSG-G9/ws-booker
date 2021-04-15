import { object, number, string, array } from 'yup';

const workspaceSchema = object({
  name: string().required(),
  description: string().required(),
  days_of_work: array().of(string()).required(),
  start_time: string().required(),
  end_time: string().required(),
  fees_per_hour: number().required(),
  fees_per_day: number().required(),
  capacity: number().required(),
  location: string().required(),
  amenities: array().of(string()).required(),
  city: string().required(),
  header_image: string().required(),
  image_gallery: string().required(),
  rating: number().required(),
});

export default workspaceSchema;
