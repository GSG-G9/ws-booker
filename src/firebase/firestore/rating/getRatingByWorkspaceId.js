import { db } from '../../config';

const getRatingByWorkspaceId = async (id) => {
  try {
    const docRef = db.collection('workspaces').doc(id);
    const response = db
      .collection('rating')
      .where('workspace_id', '==', docRef);
    const docs = await response.get();
    if (docs.empty) {
      const avg = 0;
      return avg;
    }

    const result = docs.docs.map((doc) => doc.data());
    console.log('result', result);
    if (result.length > 1) {
      const sum = result.reduce((a, b) => ({ rate: a.rate + b.rate }));
      console.log('sum', sum);
      const avg = sum.rate / (result.length - 1);
      console.log('avg', avg);
      return Math.round(avg);
    }
  } catch (err) {
    return err;
  }
};

export default getRatingByWorkspaceId;
