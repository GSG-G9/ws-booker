import { db } from '../../config';
import { canBookSchema } from '../../../utils/validation';

const editUserCanBook = async (id, payload) => {
  try {
    const { can_book: canBook } = await canBookSchema.validate(payload);
    const response = db.collection('users').doc(id);
    await response.update({
      can_book: canBook,
    });
    return {
      msg: 'user can book updated successfully',
    };
  } catch (err) {
    return err;
  }
};
export default editUserCanBook;
