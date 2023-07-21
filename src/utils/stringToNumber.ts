export function stringToNumber(str: string | undefined | null) {
  if (!isNaN(Number(str))) return Number(str);
  else throw Error(`${str} is not a number`);
}
