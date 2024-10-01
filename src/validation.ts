export function isSingleNumericalArgument(data: number[]) {
  if (data.length !== 1)
    return new Error(`data must only be of length 1: ${data}`);
  if (typeof data[0] !== "number")
    return new Error(`data must be a number: ${data}`);
  if (!Number.isSafeInteger(data[0]))
    return new Error(`data must be an integer: ${data}`);
  if (data[0] <= 0) return new Error(`data must be greater than 0: ${data}`);

  return true;
}

export function isPlateNumber(plateNumber: string) {
  // a regex that matches a string starting with 3 capital alphabetical letters,
  // followed by a -, followed by a 4 digit number
  const regex = /^[A-Z]{3}-\d{4}$/;
  return plateNumber.match(regex)
    ? true
    : new Error(`plate number is formatted incorrectly: ${plateNumber}`);
}

export function isColor(color: string) {
  const regex = /^[A-Z].*/; // regex that matches any string that starts with a capital letter
  return color.match(regex)
    ? true
    : new Error(`color is incorrectly formatted: ${color}`);
}
