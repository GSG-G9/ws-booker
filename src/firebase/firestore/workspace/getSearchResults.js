import { db } from '../../config';

const getSearchResults = async (city, capacity) => {
  try {
    if (city != null && capacity != null) {
      const data = await db
        .collection('workspaces')
        .where('city', '==', city)
        .where('capacity', '>=', Number(capacity))
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (city != null && capacity === null) {
      const data = await db
        .collection('workspaces')
        .where('city', '==', city)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (city === null && capacity != null) {
      const data = await db
        .collection('workspaces')

        .where('capacity', '>=', Number(capacity))
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
  } catch (err) {
    return err;
  }
};
export default getSearchResults;
