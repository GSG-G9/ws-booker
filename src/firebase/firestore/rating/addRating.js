import { db } from '../../config';
import { addRatingSchema } from '../../../utils/validation';

const addRating = async (data) => {
  try {
    const { userId, workspaceId, rate } = await addRatingSchema.validate(data);
    await db.collection('rating').add({
      user_id: db.doc(`users/${userId}`),
      workspace_id: db.doc(`workspaces/${workspaceId}`),
      rate,
    });
    return {
      succeed: true,
      msg: 'rating added successfully',
    };
  } catch (err) {
    return err;
  }
};

export default addRating;
