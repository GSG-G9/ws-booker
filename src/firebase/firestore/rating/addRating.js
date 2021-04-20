import { db } from '../../config';

const addRating = async (userId, workspaceId, rate) => {
  try {
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
