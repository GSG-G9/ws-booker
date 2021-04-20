import { db } from '../../config';

const getRatingByWorkspaceId = async (id) => {
  try {
    const docRef = db.collection('workspaces').doc(id);
    const response = db
      .collection('rating')
      .where('workspace_id', '==', docRef);
    const docs = await response.get();
    if (docs.empty) {
      throw new Error('No matching documents.');
    }
    const result = docs.docs.map((doc) => doc.data());
    console.log('result', result);
    return result;
  } catch (err) {
    return err;
  }
};

export default getRatingByWorkspaceId;
