function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (right >= left) {
    if (arr[0] === 0) {
      return arr.length;
    } else if (arr[0] === 1) {
      return 0;
    } else if (arr[mid] === 1) {
      left = mid + 1;
    } else if (arr[mid] === 0) {
      right = mid - 1;
    } else if (arr[mid] === 0 && arr[mid-1] == 1){
        return arr.length - arr[mid + 1];
    }
    return 0;
  }
}

countZeroes(countZeroes([1,1,1,1,0,0]))
module.exports = countZeroes;
