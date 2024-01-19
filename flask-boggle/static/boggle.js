class BoggleGame{
    constructor(secs=60){
        this.secs = secs;
        this.timer = 0;
        this.score = 0;
        this.words = new Set();
        this.updateTimer();


        $('.choose-word').on('submit', this.handleSubmitClick.bind(this))
        $('.newGameBtn').on('submit', this.loadNewGame.bind(this))
        $('.startTimer').on('click', this.startNewGame.bind(this))
    }
    
    loadNewGame(){
        console.log("STARTING NEW GAME")
        this.clearWordList();

        this.startTimer();
        $('.curr-score').text(0)
        $('.choose-word').show();
        $('.msg').empty()
        this.score = 0;
    }

    startTimer(){
        $('.startTimer').hide()
        this.words.clear();
        console.log('started timer');
        this.secs = 60;
        this.updateTimer();
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    updateTimer(){
        $('.curr-time').text(this.secs)
    }

    tick(){
        this.secs -= 1;
        this.updateTimer();

        if(this.secs === 0){
            clearInterval(this.timer);
            this.timer = 0;
            this.endOfGame();
        }
    }

    showScore(){
        $('.curr-score').text(this.score)
    }

    newHighScore(){
        $('.highscore').text(this.score)
    }

    addWordToList(word){
        $('.word-list').append($('<li>', {text: word}))
    }

    clearWordList(){
        $('.word-list').empty();
    }

    showMessage(message) {
        $(".msg").text(message)
    }

    async handleSubmitClick(e){
        e.preventDefault();
        const $word = $('.word');
        let wordVal = $word.val();

        if(!wordVal) return;

        if(this.words.has(wordVal)) {
            this.showMessage(`Already found ${wordVal}. Find a new word`);
            $word.val("")
            return;
        }
        const res = await axios.get("/check-word", {params: {word: wordVal}})
        if (res.data.result === "not-a-word"){
            this.showMessage(`${wordVal} is not a word`);
        } else if (res.data.result === "not-on-board"){
            this.showMessage(`${wordVal} is not on the board`);
        } else {
            this.showMessage(`You found ${wordVal}. Great job! Added ${wordVal}.`);
            this.addWordToList(wordVal);
            this.words.add(wordVal);
            this.score += wordVal.length;
            this.showScore();

        }
        $word.val("")
    }

    async endOfGame(){
        if(this.secs === 0){
            console.log("GAME OVER");
            $('.choose-word').hide();
            const res = await axios.post("/post-score", {score: this.score});
            if(res.data.brokeRecord) {
                this.newHighScore();
                this.showMessage(`New highscore! Score: ${this.score}`)
            } else{
                this.showMessage(`Final score: ${this.score}`)
            }
        }
        console.log("GAME OVER");
        $('.choose-word').hide();

    }

    startNewGame(e){
        console.log("STARTING NEW GAME")
        e.preventDefault();
        this.clearWordList();

        this.startTimer();
        $('.curr-score').text(0)
        $('.choose-word').show();
        $('.msg').empty()
        this.score = 0;
    }
}


