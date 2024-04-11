const ExpressError = require("./expressError");


class Operations{
    mode(numsArr){
        const frequency = {};

        for(let num of numsArr){
            frequency[num] = (frequency[num] || 0) + 1;
        }

        const maxFreqency = Math.max(...Object.values(frequency));

        const modes = [];
        for(let num in frequency){
            if(frequency[num] === maxFreqency){
                modes.push(parseInt(num));
            }
        }
        if(modes.length===1){
            return modes[0]
        } else{
            return modes;
        }
    }

    median(numsArr){
        numsArr.sort((a,b) => a - b);
        const midPoint = Math.floor(numsArr.length / 2);
        if(numsArr.length % 2 ===0){
            return (numsArr[midPoint-1]+numsArr[midPoint])/2
        } else {
            return numsArr[midPoint]
        }
    }

    mean(numsArr){
        if(numsArr.length===0) return 0;
        let sum = 0;
        for(let i=0; i<numsArr.length; i++){
            sum += numsArr[i]
        }
        return sum / numsArr.length;
    }

    checkQueryString(queryString){
        if(!queryString){
            throw new ExpressError('No values passed in. Please add a list of comma-separated numbers', 400)
        }
    }

    convertStringToIntArray(queryString){
        const nums = queryString.split(',');
        const numsArr = nums.map(Number);
        return numsArr;
    }
}

// const operations = new Operations;
// const arr = [2, 3, 11, 13, 4, 3, 47, 9];
// const arr2 = [2, 3, 11, 13, 26, 34, 47];
// const arr3 = [2, 3, 11, 3, 2, 3, 3, 47, 2, 2];
// const medianResult2 = operations.median(arr2);
// const meanResult = operations.mean(arr);
// const modeResult = operations.mode(arr3);
// console.log("Median:", medianResult2);
// console.log("Mean:", meanResult);
// console.log("Mode:", modeResult);
module.exports = Operations