import { db } from '../../config';

const getAllWorkspaces = async () => {
  try {
    const data = await db.collection('workspaces').get();
    if (!data) {
      return new Error('No data returned!');
    }

    const id = data.docs.map((i) => console.log(i.id));
    const result = data.docs.map((doc) => doc.data());

    return [...id, ...result];
  } catch (err) {
    return err;
  }
};

export default getAllWorkspaces;
