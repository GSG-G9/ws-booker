import { db } from '../config';

const getAllWorkspaces = async () => {
  try {
    const response = db.collection('workspaces');
    const data = await response.get();
    if (!data) {
      return new Error('No data returned!');
    }
    const result = data.docs;
    return result;
  } catch (err) {
    return err;
  }
};

export default getAllWorkspaces;
