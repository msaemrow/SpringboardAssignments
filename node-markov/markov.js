/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for(let i=0; i<this.words.length; i+=1){
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if(chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    console.log("ran makeChains function")
    this.chains = chains;
  }

  static choice(keyArray) {
    return keyArray[Math.floor(Math.random() * keyArray.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
   let keys = Array.from(this.chains.keys());
   let key = MarkovMachine.choice(keys)
   let out = [];

   while(out.length < numWords && key !== null){
    out.push(key);
    key = MarkovMachine.choice(this.chains.get(key));
   }
   console.log("ran make text function")
   return out.join(" ");
  }
}
const sample = "the the the the the"
const sampleText = "I AM SAM. I AM SAM. SAM I AM THAT SAM-I-AM! THAT SAM-I-AM I DO NOT LIKE THAT SAM-I-AM DO WOULD YOU LIKE GREEN EGGS AND HAM I DO NOT LIKE THEM,SAM-I-AM. I DO NOT LIKE GREEN EGGS AND HAM. WOULD YOU LIKE THEM HERE OR THERE? I WOULD NOT LIKE THEM HERE OR THERE. I WOULD NOT LIKE THEM ANYWHERE."

const nm = new MarkovMachine(sampleText);
const randomText = nm.makeText(50);

console.log(randomText);
console.log(randomText.length)


module.exports = {
  MarkovMachine,
};