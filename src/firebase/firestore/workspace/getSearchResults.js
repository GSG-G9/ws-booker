import { db } from '../../config';

const getSearchResults = async (name, city, capacity) => {
  try {
    if (name && city && capacity) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', name)
        .where('city', '==', city)
        .where('capacity', '>=', Number(capacity))
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (name && city) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', name)
        .where('city', '==', city)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
    }
    if (name && capacity) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', name)
        .where('capacity', '==', capacity)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (city && capacity) {
      const data = await db
        .collection('workspaces')
        .where('capacity', '==', capacity)
        .where('city', '==', city)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (name) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', name)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => doc.data());
      return result;
    }
    if (city) {
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
    if (capacity) {
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
    return null;
  } catch (err) {
    return err;
  }
};
export default getSearchResults;
