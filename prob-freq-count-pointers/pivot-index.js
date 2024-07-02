// accepts an array of integers
function pivotIndex(arr) {
    if(arr.length === 0) return -1;

    let leftSum = 0
    let rightSum = arr.reduce((acc, val) => acc + val, 0);
    let pivot = -1;
    //loop through comparing the left and right sum until left and right indices cross
    for(let i = 0; i < arr.length; i++){
        rightSum -= arr[i];
        if(leftSum === rightSum){
            pivot = i;
            break;
        }
        leftSum += arr[i];
    }
    return pivot
}
