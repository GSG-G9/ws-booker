import { db } from '../../config';
import { workspaceRatingSchema } from '../../../utils/validation';

const editWorkspaceRating = async (id, data) => {
  try {
    const { rating } = await workspaceRatingSchema.validate(data);
    await db.collection('workspaces').doc(id).update({
      rating,
    });
    return { msg: 'rating updated successfully' };
  } catch (err) {
    return err;
  }
};

export default editWorkspaceRating;
