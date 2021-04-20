import { db } from '../../config';
import { workspaceRatingSchema } from '../../../utils/validation';
import { getRatingByWorkspaceId } from '../rating';

const editWorkspaceRating = async (id) => {
  try {
    const workspaceRate = await getRatingByWorkspaceId(id);
    if (workspaceRate.length) {
      const sum = workspaceRate.reduce((a, b) => ({ rate: a.rate + b.rate }));
      console.log('sum', sum);
      const avg = sum.rate / workspaceRate.length;
      console.log('avg', avg);
      await db
        .collection('workspaces')
        .doc(id)
        .update({
          rating: Math.round(avg),
        });
      return { msg: 'rating updated successfully' };
    }
  } catch (err) {
    return err;
  }
};

export default editWorkspaceRating;
