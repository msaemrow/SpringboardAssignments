import React, {useState, useEffect, useCallback} from "react";
import axios from "axios"
import "../css/JokeList.css"
import Joke from  "./Joke"

const JokeList = ({numJokesToGet = 5}) => {
    const [jokes, setJokes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getJokes = useCallback(async () => {
        try{
            let jokes = [];
            let seenJokes = new Set();

            while (jokes.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                  headers: { Accept: "application/json" }
                });
                let { ...joke } = res.data;
        
                if (!seenJokes.has(joke.id)) {
                  seenJokes.add(joke.id);
                  jokes.push({ ...joke, votes: 0, locked:false });
                } else {
                  console.log("duplicate found!");
                }
              }
        
            setJokes(jokes);
            setIsLoading(false);
            localStorage.setItem("jokes", JSON.stringify(jokes));
        } catch(err){
            console.error(err);
        }
    }, [numJokesToGet]);

    useEffect(() => {
        const savedJokes = JSON.parse(localStorage.getItem("jokes"));
        if(savedJokes && savedJokes.length > 0){
            setJokes(savedJokes);
            setIsLoading(false);
        } else{
            getJokes();
        }
    }, [getJokes])

    const generateNewJokes = async () => {
        setIsLoading(true);
        try{
            let newJokes = [];
            let seenJokes = new Set(jokes.filter(joke => joke.locked).map(joke=> joke.id))
            
            const lockedJokes = jokes.filter(joke => joke.locked)
            newJokes.push(...lockedJokes);

            while(newJokes.length < numJokesToGet){
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: {Accept: "application/json"}
                });
                let { ...joke } = res.data;
                
                if(!seenJokes.has(joke.id)){
                    seenJokes.add(joke.id);
                    newJokes.push({...joke, votes: 0, locked: false});
                } else{
                    console.log("duplicate joke found")
                }
            }
                newJokes = newJokes.filter(joke => !joke.locked)
                newJokes = newJokes.slice(0, numJokesToGet)
                const updatedJokes = [
                    ...jokes.filter(joke => joke.locked),
                    ...newJokes
                ];


                setJokes(updatedJokes);
                setIsLoading(false);
                localStorage.setItem("jokes", JSON.stringify(updatedJokes));
            
            } catch(err){
                console.error(err)
                setIsLoading(false);
        }
      };

      const vote = (id, delta) => {
        setJokes(jokes => {
          const updatedJokes = jokes.map(j =>
            j.id === id ? { ...j, votes: j.votes + delta } : j
          );
          localStorage.setItem("jokes", JSON.stringify(updatedJokes));
          return updatedJokes;
        });
      };


      const toggleLock = (id) => {
        setJokes(jokes => {
            const updatedJokes = jokes.map(j =>
                j.id === id ? {...j, locked: !j.locked} : j
            );
            localStorage.setItem("jokes", JSON.stringify(updatedJokes));
            return updatedJokes;
        });
      };

      let sortedJokes = [...jokes].sort((a,b) => b.votes - a.votes);

      if(isLoading){
        return(
            <div className="JokeList-loading">
                <h1>Loading...</h1>
            </div>
        )
      }
    return (
        <div className="JokeList">
            <button className="JokeList-new-btn" onClick={generateNewJokes}>
                Get New Jokes
            </button>
            <div className="JokeList-jokes">
                {sortedJokes.map(joke => (
                    <Joke 
                        key={joke.id}
                        id={joke.id}
                        vote={vote}
                        votes={joke.votes}
                        text={joke.joke}
                        locked={joke.locked}
                        toggleLocked={toggleLock}
                    />
                ))}
            </div>
        </div>
    )
}

export default JokeList;