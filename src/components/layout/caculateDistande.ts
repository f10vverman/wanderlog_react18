type CoordinatesType = number[];

export const calculateSegmentDistance = (coord1: CoordinatesType, coord2: CoordinatesType): number => {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 6371e3;
  const fi1 = lat1 * Math.PI / 180;
  const fi2 = lat2 * Math.PI / 180;
  const deltaFi = (lat2 - lat1) * Math.PI / 180;
  const deltaLam = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
            Math.cos(fi1) * Math.cos(fi2) *
            Math.sin(deltaLam / 2) * Math.sin(deltaLam / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const calculateTotalDistance = (points: CoordinatesType[]): number => {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += calculateSegmentDistance(points[i-1], points[i]);
  }
  return total;
};
