import { object, number } from 'yup';

const workspaceRatingSchema = object({
  rating: number().required(),
});

export default workspaceRatingSchema;
