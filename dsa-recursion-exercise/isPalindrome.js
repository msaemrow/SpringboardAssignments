
function isPalindrome(word, start=0, end=word.length-1){
    //ensure capital letters don't mess up checking for palindrome
    let str = word.toLowerCase();
    if(start > end){
        return true;
    }
    if(str[start] !== str[end]){
        return false
    }
    return isPalindrome(word, start + 1, end - 1);
}

let word1 = "racecar";
let word2 = "bananas";

module.exports = isPalindrome;