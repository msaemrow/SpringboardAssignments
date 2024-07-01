
//create frequency counter
function countDigits(array){
    let frequency = new Map();

    for(let num of array){
        let numCount = frequency.get(num) || 0;
        frequency.set(num, numCount + 1);
    }
    return frequency;
}
// takes input of two positive integers
function sameFrequency(int1, int2) {
    //convert integers to a string
    let int1Str = int1.toString();
    let int2Str = int2.toString();
    //check if same length-- if not return false
    if(int1Str.length !== int2Str.length){
        console.log("Number of digits don't match");
        return false;   
    } 
    //convert string to an array
    let int1Arr = int1Str.split('');
    let int2Arr = int2Str.split('');
    //count number of digits in each number
    let int1Count = countDigits(int1Arr);
    let int2Count = countDigits(int2Arr);
    //for each key, check if key is is there and if values match-- if not return false
    for(let key of int1Count.keys()){
        if(!int2Count.has(key) || int2Count.get(key) !== int1Count.get(key)){
            console.log("Numbers don't contain the same number of digits");
            return false;
        }
    }
    // otherwise return true
    return true;
}
