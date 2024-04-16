//function to find product of nums in an array using recursion

function findProduct(nums, i=0){
    if(i === nums.length){ return 1
    } else {
        return nums[i] * findProduct(nums, i + 1);
    }   
}

let numArr = [2,3,4,10]

module.exports = findProduct;