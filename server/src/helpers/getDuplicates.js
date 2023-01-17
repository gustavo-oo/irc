export default function getDuplicates(arr) {
  const duplicateTracker = {};
  for (let i = 0; i < arr.length; i++) {
    if (duplicateTracker.hasOwnProperty(arr[i])) {
      return arr[i];
    } else {
      duplicateTracker[arr[i]] = true;
    }
  }
  return null;
}
