import { db } from '../../config';

const DeleteWorkspace = async (id) => {
  try {
    const response = db.collection('workspaces').doc(id);
    const data = await response.get();
    if (!data.exists) {
      return { msg: 'The Workspace Not Found!' };
    }
    await response.delete();
    return { msg: 'workspace deleted Successfully' };
  } catch (err) {
    return err;
  }
};
export default DeleteWorkspace;
