import { db } from '../../config';

import { getRatingByWorkspaceId } from '../rating';

const editWorkspaceRating = async (id) => {
  try {
    const workspaceRate = await getRatingByWorkspaceId(id);
    if (workspaceRate.length === 2) {
      console.log('1111');
      await db.collection('workspaces').doc(id).update({
        rating: workspaceRate[0].rate,
      });
      return { msg: 'rating updated successfully' };
    }

    if (workspaceRate.length > 2) {
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
