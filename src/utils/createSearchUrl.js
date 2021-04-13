const createSearchUrl = (q, city, capacity) => {
  const queryData = {
    q,
    city,
    capacity,
  };
  const queryStringArray = [];
  Object.keys(queryData).forEach((key) => {
    if (queryData[key]) queryStringArray.push(`${key}=${queryData[key]}`);
  });
  return `/search?${queryStringArray.join('&')}`;
};

export default createSearchUrl;
