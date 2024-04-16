function balancedBrackets(str, i=0, open=0){
    if(i === str.length && open === 0) return true;
    
    if(i === str.length && open !== 0) return false;

    let char = str[i];

    if(char === '(' || char === '[' || char === '{'){
        return balancedBrackets(str, i+1, open+1);
    } else if(char === ')' || char === ']' || char === '}'){
        if(open === 0){
            return false;
        }
        return balancedBrackets(str, i+1, open-1);
    } else {
        return balancedBrackets(str, i+1, open);
        }
}