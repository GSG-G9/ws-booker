import { object, number, string } from 'yup';

const addRatingSchema = object({
  userId: string().required(),
  workspaceId: string().required(),
  rate: number().required(),
});

export default addRatingSchema;
