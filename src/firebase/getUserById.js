import { db } from './config';

const getUserById = async (id) => {
  const response = db.collection('users').doc(id);
  const doc = await response.get();
  if (!doc.exists) {
    return 'No such document!';
  }
  return doc.data();
};

export default getUserById;
