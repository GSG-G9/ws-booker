const checkOverlap = (timeSegments) => {
  if (timeSegments.length === 1) return false;

  timeSegments.sort((timeSegment1, timeSegment2) =>
    timeSegment1[0].localeCompare(timeSegment2[0])
  );
  const currentEndTime = timeSegments[0][1];
  const nextStartTime = timeSegments[1][0];
  if (currentEndTime > nextStartTime) {
    return true;
  }
  return false;
};

export default checkOverlap;
