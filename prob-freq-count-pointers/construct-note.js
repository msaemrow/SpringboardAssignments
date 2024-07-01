//accepts 2 strings (msg, letters)
function frequencyCounter(array){
    let frequencies = new Map();

    for(let val of array){
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }
    return frequencies;
}
function constructNote(msg, letters) {
    //make sure there are enough letters to create message
    if(msg.length > letters.length) return false;
    //get count of all letters for both msg and letters
    let msgCount = frequencyCounter(msg.split(''));
    let letterCount = frequencyCounter(letters.split(''));
    //compare letters in message to letters string
    for(let key of msgCount.keys()){
        //return false if letter counts don't match up or letter is missing
        if(!letterCount.has(key)) return false;
        if(letterCount.get(key) < msgCount.get(key)) return false;
    }
    //return true if letters can make msg
    return true
}

constructNote("bananas", "aabbsnna")
constructNote("bananas", "aabbsnaaa")