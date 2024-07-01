//accepts 2 arrays of varying length
//array 1 contains keys; array 2 contains values
function twoArrayObject(keys, values) {
    //create an empty object
    let obj = {}
    //loop through keys array
    for(let i = 0; i<keys.length; i++){
    //set value for the key[i] to be value[i]
    //if there is no value[i], add set value to null
        obj[keys[i]] = values[i] || null
    }
    //ignore remaining values in values array and return obj
    return obj;
}
