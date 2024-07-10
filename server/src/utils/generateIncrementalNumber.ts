export const generateIncrementalNumber = (str: string) => {
  const splitted = str.split("-");
  const getLastString = splitted[splitted.length - 1];
  const getNumber = parseInt(getLastString) + 1;
  const getNextString = getNumber.toString().padStart(4, "0");
  return getNextString;
};
