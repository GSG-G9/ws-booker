import { db } from './config';

const getAllWorkspaces = async () => {
  try {
    const response = await db.collection('workspaces').get();
    if (!response.exists) {
      return 'No such document!';
    }
    return response.data();
  } catch (err) {
    return err;
  }
};

export default getAllWorkspaces;
