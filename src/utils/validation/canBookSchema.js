import { object, boolean } from 'yup';

const canBookSchema = object({
  can_book: boolean().required(),
});

export default canBookSchema;
