// accepts an array of integers
function longestFall(arr) {
    //if empty array, return 0
    if(arr.length == 0) return 0;
    //initialize length of fall to 1
    let fall = 1;
    //initialize a counter
    let counter = 1;
    //loop through array 
    for(let i=0; i<arr.length-1; i++){
        //check if first integer is greater than second integer
        //if less than add 1 to counter
        if(arr[i] > arr[i+1]){
            counter++;
        } else{
            //if greater set fall to equal the greate of counter and fall and set counter to 1
            fall = Math.max(fall, counter);
            counter = 1;
        }
    }
    fall = Math.max(fall, counter);
    //returns length of longest consecutive decrease in integers
    return fall;
}
