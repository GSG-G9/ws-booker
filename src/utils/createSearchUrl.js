const createSearchUrl = (q, date, capacity) => {
  const queryData = {
    q,
    date,
    capacity,
  };
  const queryStringArray = [];
  Object.keys(queryData).forEach((key) => {
    if (queryData[key]) queryStringArray.push(`${key}=${queryData[key]}`);
  });
  return `/search?${queryStringArray.join('&')}`;
};

export default createSearchUrl;
