export const truncateString = (str: string | undefined, num: number) => {
  if (!str) return null;
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};
