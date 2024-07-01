// accepts (array, target)
function averagePair(arr, target) {
    //use multiple pointers
    if(arr[0] > target) return false;
    //start with index 1 at beginning and index 2 at the end
    let left = 0;
    let right = arr.length-1;
    while(left < right){
        let average = (arr[left] + arr[right]) / 2
        //if the average matches the target, return true
        if(average === target){
            return true;
        //if the average is > than the target, decrease the right side
        } else if(average > target){
            right--;
        //if the average is < than the target, increase the left side
        } else{
            left++
        }
    }
    //if no matches are found, return false
    return false;
}
