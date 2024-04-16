function gatherStrings(obj){
    let strings = [];

    for(let key in obj){
        if(typeof obj[key]=== 'string'){
            strings.push(obj[key]);
        } else if(typeof obj[key] === 'object'){
            strings = strings.concat(gatherStrings(obj[key]))
        }
    }
    return strings;
}

module.exports = gatherStrings;