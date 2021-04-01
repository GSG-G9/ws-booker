import { db } from '../../firebase/config';

const getWorkspaceById = async (id) => {
  try {
    const response = db.collection('workspaces').doc(id);
    const data = await response.get();
    return data.data();
  } catch (err) {
    return err;
  }
};

export default getWorkspaceById;
