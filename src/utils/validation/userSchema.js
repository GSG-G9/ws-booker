import { object, number, string } from 'yup';

const userSchema = object({
  name: string().required(),
  phone_number: number().required(),
});

export default userSchema;
