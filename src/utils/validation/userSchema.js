import { object, string } from 'yup';

const userSchema = object({
  name: string().required(),
  phone_number: string().required(),
});

export default userSchema;
