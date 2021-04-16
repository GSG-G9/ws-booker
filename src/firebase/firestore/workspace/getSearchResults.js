import { db } from '../../config';
import { searchSchema } from '../../../utils/validation';

const getSearchResults = async (queryObj) => {
  try {
    const { q, city, capacity } = await searchSchema.validate(queryObj);
    if (q && city && capacity) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', q)
        .where('city', '==', city)
        .where('capacity', '>=', Number(capacity))
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return result;
    }
    if (q && city) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', q)
        .where('city', '==', city)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return result;
    }
    if (q && capacity) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', q)
        .where('capacity', '>=', capacity)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return result;
    }
    if (city && capacity) {
      const data = await db
        .collection('workspaces')
        .where('capacity', '>=', capacity)
        .where('city', '==', city)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return result;
    }
    if (q) {
      const data = await db
        .collection('workspaces')
        .where('name', '==', q)
        .get();
      if (!data) {
        return new Error('No data returned!');
      }
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return result;
    }
    return null;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default getSearchResults;
