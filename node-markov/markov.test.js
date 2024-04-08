const { MarkovMachine } = require("./markov")

describe('test markov machine', function() {
    test('make new chains', function(){
        let nm = new MarkovMachine("the cat in the hat");
        expect(nm.chains).toEqual(new Map([
            ["the", ["cat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the"]],
            ["hat", [null]]]));
    });

    test('check picking random number from array', function(){
        expect(MarkovMachine.choice(["the", "the", "the"])).toEqual("the");
    });

    test('check if returns valid string', function(){
        const sampleText = "the the the";
        const nm = new MarkovMachine(sampleText);
        const randomText = nm.makeText(5);
        expect(randomText).toContain("the")
        expect(randomText.endsWith("the")).toBe(true);
    });


    test('check valid length', function(){
        let nm = new MarkovMachine("the cat in the hat");
        let output = nm.makeText(2);

        let outputWords = output.split(/[ \r\n]+/);
        expect([1,2]).toContain(outputWords.length)
    })
})