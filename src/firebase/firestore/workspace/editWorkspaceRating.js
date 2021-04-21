import { db } from '../../config';

import { getRatingByWorkspaceId } from '../rating';

const editWorkspaceRating = async (id) => {
  try {
    const workspaceRate = await getRatingByWorkspaceId(id);
    await db.collection('workspaces').doc(id).update({
      rating: workspaceRate,
    });
    return { msg: 'rating updated successfully' };
  } catch (err) {
    return err;
  }
};
export default editWorkspaceRating;
