import { db } from '../../config';
import { searchSchema } from '../../../utils/validation';

const getSearchResults = async (queryObj) => {
  try {
    const { q, city, capacity } = await searchSchema.validate(queryObj);
    if (q && city && capacity) {
      const data = await db
        .collection('workspaces')
        .where('capacity', '>=', Number(capacity))
        .orderBy('capacity', 'asc')
        .orderBy('name_lower', 'asc')
        .orderBy('city_lower', 'asc')
        .startAt(capacity, q.toLowerCase(), city.toLowerCase())
        .endAt(`${q.toLowerCase()}\uf8ff`, `${city.toLowerCase()}\uf8ff`)
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
        .orderBy('name_lower', 'asc')
        .orderBy('city_lower', 'asc')
        .startAt(q.toLowerCase(), city.toLowerCase())
        .endAt(`${q.toLowerCase()}\uf8ff`, `${city.toLowerCase()}\uf8ff`)
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
        .where('capacity', '>=', capacity)
        .orderBy('capacity', 'asc')
        .orderBy('name_lower', 'asc')
        .startAt(capacity, q.toLowerCase())
        .endAt(`${q.toLowerCase()}\uf8ff`)
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
        .orderBy('capacity', 'asc')
        .orderBy('city_lower', 'asc')
        .startAt(capacity, city.toLowerCase())
        .endAt(`${city.toLowerCase()}\uf8ff`)
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
        .orderBy('name_lower', 'asc')
        .startAt(q.toLowerCase())
        .endAt(`${q.toLowerCase()}\uf8ff`)
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
        .orderBy('city_lower', 'asc')
        .startAt(city.toLowerCase())
        .endAt(`${city.toLowerCase()}\uf8ff`)
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
    return err;
  }
};
export default getSearchResults;
