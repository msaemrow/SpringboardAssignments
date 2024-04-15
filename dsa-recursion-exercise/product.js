//function to find product of nums in an array using recursion

function findProduct(nums, i=0){
    if(i === nums.length){ return 1
    } else {
        return nums[i] * findProduct(nums, i + 1);
    }   
}

let numArr = [2,3,4]

function findProductRecursive(nums) {
    if (nums.length === 0) {
        return 1;
    } else {
        return nums[0] * findProductRecursive(nums.slice(1));
    }
}

let product = findProductRecursive(numArr)