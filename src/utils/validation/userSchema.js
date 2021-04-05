import { object, number, string } from 'yup';

const userSchema = object({
  name: string().required(),
  phoneNumber: number().required(),
  image: string().required(),
});

export default userSchema;
