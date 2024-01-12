class BoggleGame{

    constructor(boardId, secs=60){
        this.secs = secs;
        this.showTimer()

        this.score = 0;
        this.words = new Set();
        this.board = $("#" + boardId)

        this.timer = setInterval(this.tick.bind(this), 1000)

        $('.choose-word').on('submit', this.handleSubmitClick.bind(this))
        // $('.newGameBtn').on('submit', this.handleNewGameClick.bind(this))
    }


    // handleNewGameClick(e){
    //     e.preventDefault();
    //     let game = new BoggleGame("boggle", 10)
    // }

    showTimer(){
        $('.curr-time').text(this.secs)
    }

    tick(){
        this.secs -= 1;
        this.showTimer();

        if(this.secs === 0){
            clearInterval(this.timer);
            console.log("GAME OVER");
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
        $('.choose-word').hide();
        const res = await axios.post("/post-score", {score: this.score});
        if(res.data.brokeRecord) {
            this.newHighScore();
            this.showMessage(`New highscore! Score: ${this.score}`)
        } else{
            this.showMessage(`Final score: ${this.score}`)
        }
    }
}