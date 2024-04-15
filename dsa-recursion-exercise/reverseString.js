
function reverseString(str, i=0){
    if(i >= str.length){
        return "";
    }

    let subStr = reverseString(str, i+1);
    return subStr + str[i]
}

const reverseWord = "minnesota";