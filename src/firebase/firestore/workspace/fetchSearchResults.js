import { db } from '../../config';
import { searchSchema } from '../../../utils/validation';

const fetchSearchResults = async (queryObj) => {
  try {
    const data = await db.collection('workspaces').get();
    if (!data) {
      return new Error('No data returned!');
    }
    const allData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const { q, city, capacity } = await searchSchema.validate(queryObj);
    if (q && city && capacity) {
      const result = allData.filter(
        (ws) =>
          ws.name.toLowerCase().includes(q.toLowerCase()) &&
          ws.city.toLowerCase().includes(city.toLowerCase()) &&
          ws.capacity >= capacity
      );
      return result;
    }
    if (q && city) {
      const result = allData.filter(
        (ws) =>
          ws.name.toLowerCase().includes(q.toLowerCase()) &&
          ws.city.toLowerCase().includes(city.toLowerCase())
      );
      return result;
    }

    if (q && capacity) {
      const result = allData.filter(
        (ws) =>
          ws.name.toLowerCase().includes(q.toLowerCase()) &&
          ws.capacity >= capacity
      );

      return result;
    }
    if (city && capacity) {
      const result = allData.filter(
        (ws) =>
          ws.city.toLowerCase().includes(city.toLowerCase()) &&
          ws.capacity >= capacity
      );
      return result;
    }
    if (q) {
      const result = allData.filter((ws) =>
        ws.name.toLowerCase().includes(q.toLowerCase())
      );
      return result;
    }
    if (city) {
      const result = allData.filter((ws) =>
        ws.city.toLowerCase().includes(city.toLowerCase())
      );
      return result;
    }
    if (capacity) {
      const result = allData.filter((ws) => ws.capacity >= capacity);
      return result;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export default fetchSearchResults;
