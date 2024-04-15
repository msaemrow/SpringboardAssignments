function findLongestWord(words, i=0){
    if(i === words.length){
        return 0;
    } else{
        const currWordLength = words[i].length;
        const nextWordLength = findLongestWord(words,  i + 1)
        return Math.max(currWordLength, nextWordLength)
    }
}

let wordList = ["hi", "minnesota", "hello", "hola", "bananas"];

