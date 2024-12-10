export const getAvatarName = (word: string | undefined | null) => {
  if (word === undefined || !word) return;
  const splitWords = word.split(' ');
  const bits =
    splitWords.length > 1
      ? word.split(' ')[0].charAt(0).toUpperCase() +
        (splitWords.slice(-1)[0]?.charAt(0).toUpperCase() || '')
      : word.charAt(0).toUpperCase();

  return bits;
};
