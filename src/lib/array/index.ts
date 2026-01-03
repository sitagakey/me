export const fisherYatesShuffle = <T>(arr: T[] = []): T[] => {
  const newArr = [...arr];

  for (let i = newArr.length; i--; ) {
    const random = Math.floor(Math.random() * i);
    const cache = newArr[i];
    newArr[i] = newArr[random];
    newArr[random] = cache;
  }

  return newArr;
};
