import { db } from '../../config';

const getAllWorkspaces = async () => {
  try {
    const data = await db.collection('workspaces').get();
    if (!data) {
      return new Error('No data returned!');
    }
    const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return result;
  } catch (err) {
    return err;
  }
};

export default getAllWorkspaces;
