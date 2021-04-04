import { db } from '../../config';
import WorkspaceSchema from '../../../utils/validation';

const editWorkspaceRating = async (id, data) => {
  try {
    const { rating, reviewers_number } = await WorkspaceSchema.validate(data);
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
