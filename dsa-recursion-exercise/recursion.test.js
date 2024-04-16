const product = require('./product');
const binarySearch = require('./binarySearch');
const findIndex = require('./findIndex');
const gatherStrings = require('./gatherStrings');
const isPalindrome = require('./isPalindrome');
const findLongestWord = require('./longestWord');
const reverseString = require('./reverseString');
const everyOtherChar = require('./everyOther');


describe("find product", function(){
    it("returns the product of all numbers in an array", function(){
        expect(product([3,4,5])).toBe(60);
        expect(product([3,4,0])).toBe(0);
        expect(product([3,4,-5])).toBe(-60);
    });
});

describe("binary search", function(){
    it("returns the index of the target number", function(){
        expect(binarySearch([1,2,3,4],1)).toBe(0);
        expect(binarySearch([1,2,3,4],3)).toBe(2);
        expect(binarySearch([1,2,3,4],5)).toBe(-1);
    });
});

describe("gatherStrings ", function(){
    it("collects all the strings in an object and returns an array of strings", function(){
        expect(gatherStrings({name:"Tim", age: 12, data: {hobby: "fishing"}})).toEqual(["Tim", "fishing"]);
        expect(gatherStrings({month: 5, day: 12, year: 2024})).toEqual([]);
    });
});

describe("findLongestWord", function(){
    it("returns the length of the longest word in an array of words ", function(){
        expect(findLongestWord(["hello", "hi", "hola"])).toBe(5);
        expect(findLongestWord(["hello", "hi", "pizza"])).toBe(5);
        expect(findLongestWord([])).toBe(0);
    });
});

describe("everyOtherChar", function(){
    it("returns every other character from a string ", function(){
        expect(everyOtherChar(("hello"))).toBe('hlo');
        expect(everyOtherChar(("h"))).toBe('h');
    });
});

describe("findIndex", function(){
    it("returns the index of the passed in value", function(){
        let animals = ["duck", "cat", "pony"];
        expect(findIndex(animals, "cat")).toBe(1);
        expect(findIndex(animals, "dog")).toBe(-1);
    });
});

describe("isPalindrome", function(){
    it("checks is a word is a palindrome and returns true or false ", function(){
        expect(isPalindrome("tacocat")).toBe(true)
        expect(isPalindrome("taco")).toBe(false)
    });
});

describe("reverseString", function(){
    it("takes string and returns the string in reverse", function(){
        expect(reverseString("porcupine")).toBe('enipucrop');
    });
});
