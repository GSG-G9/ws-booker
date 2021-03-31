import { db } from './config';

const getWorkspaceById = async (id) => {
  const response = db.collection('workspaces').doc(id);
  const data = await response.get();
  console.log(data.data());
};

export default getWorkspaceById;
