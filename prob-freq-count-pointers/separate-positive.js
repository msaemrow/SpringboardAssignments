//solution on my own
//accepts an array of non zero integers
function separatePositive2(arr) {
    let left = 0;
    let right = arr.length - 1;
    let temp = null;
    while(left < right){
        if(arr[left] < 0){
            temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            right--;
        } else if(arr[left] > 0){
            left++;
        }
    }
    return arr;
}


//optimized solution after looking for help
function separatePositive(arr){
    let left = 0;
    let right = arr.length-1;
    while(left < right){
        if(arr[left] > 0 && arr[right] < 0){
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        } else{
            if(arr[left]>0) left++
            if(arr[right]<0) right --;
        }
    }
    return arr;
}
