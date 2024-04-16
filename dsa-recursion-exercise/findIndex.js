function findIndex(arr, word, i=0){
    if(i === arr.length) return -1;

    if(arr[i] === word){
        return i;
    }
    
    return findIndex(arr, word, i+1); 
}

const arr = ["apple", "banana", "cherry", "date"];

module.exports = findIndex;