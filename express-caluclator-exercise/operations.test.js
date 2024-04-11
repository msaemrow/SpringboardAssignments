const Operations = require("./operations");
const operations = new Operations();

describe("mean", function(){
    it("finds the mean of an array of positive and negative numbers", function(){
        expect(operations.mean([1,2,3,6,7,-1])).toEqual(3)
    })
    it("finds the mean of an empty array", function(){
        expect(operations.mean([])).toEqual(0)
    })
})

describe("median", function(){
    it("find the median of an array of an odd numbered array", function() {
        expect(operations.median([1,2,3])).toEqual(2)
    })
    it("find the median of an array of an even numbered array", function() {
        expect(operations.median([1,2,4,4])).toEqual(3)
    })
    it("find the median of an unsorted array", function() {
        expect(operations.median([4,2,1,4])).toEqual(3)
    })

describe("mode", function(){
    it("find the mode where there is only a single mode", function(){
        expect(operations.mode([1,2,2,3,4,5])).toEqual(2);
    })
    it("find the mode where there are multiple modes", function(){
        expect(operations.mode([1,2,2,3,3,5])).toEqual([2,3]);
    })
    it("returns an empty array if an empty array is passed in", function(){
        expect(operations.mode([])).toEqual([]);
    })
})
})