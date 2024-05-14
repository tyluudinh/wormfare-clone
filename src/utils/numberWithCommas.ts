export const numberWithCommas = (value: number | string | null | undefined) => {
  if (value !== null && value !== undefined) {
    return Number(value).toLocaleString('en-US');
  }

  return null;
};
