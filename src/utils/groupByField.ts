export function groupByField<T>(arr: T[], field: keyof T): T[][] {
  const groupedArray: T[][] = [];

  arr.forEach((obj) => {
    const key = obj[field];
    const existingGroup = groupedArray.find((group) => group[0][field] === key);

    if (existingGroup) {
      existingGroup.push(obj);
    } else {
      groupedArray.push([obj]);
    }
  });

  return groupedArray.reverse();
}
