import { db } from './config';

const getWorkspaceById = async () => {
  const response = db.collection('workspaces');
  const data = await response.get();
  data.docs.forEach((item) => {
    console.log(item.data());
  });
};

export default getWorkspaceById;
