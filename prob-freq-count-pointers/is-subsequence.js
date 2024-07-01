function frequencyCounter(array){
    let frequencies = new Map();

    for(let val of array){
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }
    return frequencies;
}
//My first attempt without help
// inputs are two strings
// first is substring, second is full string
function isSubsequence(substring, fullString) {
    //check if length of substring is greater than fullString- return false if so
    if(substring.length > fullString.length) return false;
    //check if correct number of chars in in full string;
    let substringCount = frequencyCounter(substring.split(''));
    let fullStringCount = frequencyCounter(fullString.split(''));

    let position = 0;
    //check to make sure the right characters and right amount of charachters are in the full string
    for(let char of substringCount.keys()){
        if(!fullStringCount.has(char)) {
            console.log("missing charachter in full string");
            return false;
        }
        if(substringCount.get(char) > fullStringCount.get(char)){
            console.log("Count of characters needed is greater in substring than full string");
            return false;
        }
        while(position < fullString.length && fullString[position] !== char){
            position++
        }
            if(position >= fullString.length){
                console.log("Character not found in correct order in full string");
                return false;
            }
            position++;
        }
    return true;
}

//solution after using help
function isSubsequence2(str1, str2){
    let str1Index = 0;
    let str2Index = 0;

    if(!str1) return true;

    while(str2Index < str2,length){
        if(str2[str2Index] === str1[str1Index]){
            str1Index += 1;
        }
        if(str1Index === str1.length) return true;
        str2Index += 1;
    }
    return false;
}
