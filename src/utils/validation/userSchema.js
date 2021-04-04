import { object, number, string } from 'yup';

const editUserSchema = object({
  name: string().required(),
  phoneNumber: number().required(),
  image: string().required(),
});

export default editUserSchema;
