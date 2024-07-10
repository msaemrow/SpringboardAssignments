function guessingGame() {
    const number = Math.floor(Math.random() * 100);
    let gameOver = false;
    let guesses = 0;
    return function guess(guessNum){
            if(gameOver){
                return "The game is over, you already won!"
            }

            if(guessNum === number){
                gameOver = true;
                guesses++
                return `You win! You found ${guessNum} in ${guesses} guesses.`
            } else if(guessNum < number){
                guesses++
                return `${guessNum} is too low!`
            } else{
                guesses++
                return `${guessNum} is too high!`
            }
        }
}

module.exports = { guessingGame };
