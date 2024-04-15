function everyOtherChar(str, i=0, result=""){
    if(i>= str.length){
        return result;
    } else{
        result += str[i];
        return everyOtherChar(str, i+2, result)
    }
}


const word = "Hello world!";
