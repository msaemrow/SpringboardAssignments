function curriedAdd(total=0) {
    if (arguments.length === 0){
        return total;

    }
    function addNext(num){
        if(num !== undefined){
            return curriedAdd(total+num);
        } else{
            return total;
        }
    }
    return addNext;
}

module.exports = { curriedAdd };
