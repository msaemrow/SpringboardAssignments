// accepts an array of integers and a target value
function countPairs(arr, target) {
    let numPairs = 0;
    for(let i=0; i<arr.length-1; i++){
        console.log("ROUND: ", i)
        for(let j=i+1; j<arr.length; j++){
            console.log("INSIDE LOOP. ROUND: ", j)
            if(arr[i] + arr[j] === target){
                numPairs++;
                console.log(arr[i], arr[j], numPairs);
            }
        }
    }
    return numPairs;
}


//optimized solution after research
function countPairs2(arr, target){
    let numPairs = 0;
    let numMap = {};

    for(let i=0; i< arr.length; i++){
        let complement = target - arr[i];

        if(numMap[complement] !== undefined){
            numPairs += numMap[complement];
            console.log(arr[i], complement, numPairs);
        }

        if(numMap[arr[i]]){
            numMap[arr[i]] += 1;
        } else{
            numMap[arr[i]] = 1;
        }

        console.log(numMap)
    }
    return numPairs;
}