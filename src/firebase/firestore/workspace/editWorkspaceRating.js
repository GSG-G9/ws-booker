import { db } from '../../config';
import workspaceSchema from '../../../utils/validation';

const editWorkspaceRating = async (id, data) => {
  try {
    const { rating, reviewers_number } = await workspaceSchema.validate(data);
    await db.collection('workspaces').doc(id).update({
      rating,
      reviewers_number,
    });
    return { msg: 'rating updated successfully' };
  } catch (err) {
    return err;
  }
};

export default editWorkspaceRating;
