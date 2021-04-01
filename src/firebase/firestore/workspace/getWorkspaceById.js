import { db } from '../../config';

const getWorkspaceById = async (id) => {
  try {
    const response = db.collection('workspaces').doc(id);
    const data = await response.get();
    if (!data.exists) {
      throw new Error('No such document!');
    }
    return data.data();
  } catch (err) {
    return err;
  }
};

export default getWorkspaceById;
