const createSearchUrl = (q, date, numOfPeople) => {
  const queryData = {
    q,
    date,
    numOfPeople,
  };
  const queryStringArray = [];
  Object.keys(queryData).forEach((key) => {
    if (queryData[key]) queryStringArray.push(`${key}=${queryData[key]}`);
  });
  return `/search?${queryStringArray.join('&')}`;
};

export default createSearchUrl;
