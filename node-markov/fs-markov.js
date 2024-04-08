/** Textual markov chain generator using bigrams */


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
  
      for (let i = 0; i < this.words.length - 1; i += 1) {
        let bigram = this.words[i] + " " + this.words[i + 1];
        let nextWord = this.words[i + 2] || null;
  
        if(chains.has(bigram)) {
          chains.get(bigram).push(nextWord);
        } else {
          chains.set(bigram, [nextWord]);
        }
      }
      this.chains = chains;
    }
  
    choice(keyArray) {
      return keyArray[Math.floor(Math.random() * keyArray.length)];
    }
    /** return random text from chains */
  
    makeText(numWords = 100) {
      let keys = Array.from(this.chains.keys());
      let key = this.choice(keys);
      let out = [];
      // produce markov chain until reaching termination word
      while (out.length <= numWords && this.choice(this.chains.get(key)) !== null) {
        let [w1, w2] = key.split(" ");
        out.push(w1);
        key = w2 + " " + this.choice(this.chains.get(key));
      }
  
      return out.join(" ");
    }
  }
  // const sample = "the the the the the"
  // const sampleText = "I AM SAM. I AM SAM. SAM I AM THAT SAM-I-AM! THAT SAM-I-AM I DO NOT LIKE THAT SAM-I-AM DO WOULD YOU LIKE GREEN EGGS AND HAM I DO NOT LIKE THEM,SAM-I-AM. I DO NOT LIKE GREEN EGGS AND HAM. WOULD YOU LIKE THEM HERE OR THERE? I WOULD NOT LIKE THEM HERE OR THERE. I WOULD NOT LIKE THEM ANYWHERE."
  
  // const nm = new MarkovMachine(sampleText);
  // const randomText = nm.makeText();
  
  // console.log(randomText);
  // console.log(randomText.length)
  
  
  module.exports = {
    MarkovMachine,
  };