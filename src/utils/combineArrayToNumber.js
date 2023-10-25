export default function combineArrayToNumber(arr) {
  const combinedNumber = parseInt(arr.join(""), 10);
  return isNaN(combinedNumber) ? null : combinedNumber;
}
