export const updateArrayItem = <T extends { id: unknown }>(
  array: T[],
  id: unknown,
  data: Partial<T>,
): T[] => {
  return array.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...data,
      };
    }

    return item;
  });
};
