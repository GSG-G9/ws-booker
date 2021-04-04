import { db } from '../../config';

const getWorkspaceById = async (id) => {
  try {
    const response = await db.collection('workspaces').doc(id).get();
    if (!response.exists) {
      throw new Error('No such document!');
    }
    return response.data();
  } catch (err) {
    return err;
  }
};

export default getWorkspaceById;
